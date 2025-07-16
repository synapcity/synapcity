"use client";

import { useEffect, useCallback } from "react";
import { useWeatherStore } from "@/stores/weatherStore/useWeatherStore";
import { getWeather } from "@/lib";
import { toast } from "sonner";
import { shallow } from "zustand/shallow";

export function useWeatherEffect() {
	const setData = useWeatherStore((s) => s.setData);
	const preferences = useWeatherStore((s) => s.preferences);
	const setLoading = useWeatherStore((s) => s.setLoading);
	const justFetchedManually = useWeatherStore((s) => s.justFetchedManually);
	const unit = useWeatherStore.getState().preferences.unit;
	const hasHydrated = useWeatherStore((s) => s.hasHydrated);
	const setJustFetchedManually = useWeatherStore(
		(s) => s.setJustFetchedManually
	);

	const subscribe = useWeatherStore.subscribe;

	const fetchAndUpdate = useCallback(async () => {
		if (justFetchedManually) {
			setJustFetchedManually(false);
			return;
		}
		console.log("[auto fetch triggered]", Date.now(), preferences);

		setLoading(true);
		const { zipcode, gpsCoords, locationSource, alertsEnabled } = preferences;

		const result = await getWeather({
			unit,
			zip: locationSource === "zip" ? zipcode ?? undefined : undefined,
			lat: locationSource === "gps" ? gpsCoords?.lat : undefined,
			lon: locationSource === "gps" ? gpsCoords?.lon : undefined,
		});

		if (result) {
			setData(result);
			setLoading(false);
			if (alertsEnabled && result.rainSoon) {
				toast("Rain Alert", {
					description:
						"☔️ Rain is likely within the next hour near your location.",
				});
			}
		}
	}, [
		justFetchedManually,
		preferences,
		setLoading,
		unit,
		setJustFetchedManually,
		setData,
	]);

	useEffect(() => {
		if (!hasHydrated) return;
		fetchAndUpdate();

		const unsub = subscribe(
			(state) => ({
				zipcode: state.preferences.zipcode,
				gpsCoords: state.preferences.gpsCoords,
				locationSource: state.preferences.locationSource,
				alertsEnabled: state.preferences.alertsEnabled,
			}),
			() => {
				fetchAndUpdate();
			},
			{ equalityFn: shallow }
		);

		const interval = setInterval(fetchAndUpdate, 30 * 60 * 1000);
		return () => {
			unsub();
			clearInterval(interval);
		};
	}, [fetchAndUpdate, subscribe, hasHydrated]);

	return { preferences, fetchAndUpdate };
}
