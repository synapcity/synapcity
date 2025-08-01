import { WeatherState } from "../useWeatherStore";

export const defaultWeatherStore: WeatherState = {
	hasHydrated: false,
	setHasHydrated: () => {},
	data: null,
	locationLabel: null,
	preferences: {
		unit: "celsius",
		zipcode: null,
		alertsEnabled: false,
		gpsCoords: null,
		locationSource: "gps",
	},
	loading: false,
	justFetchedManually: false,
	setJustFetchedManually: () => {},
	setLoading: () => {},
	setLocationSource: () => {},
	setData: () => {},
	setLocationLabel: () => {},
	setPreferences: () => {},
	setGpsCoords: () => {},
};

export const migrateWeatherStore = (
	persistedState: unknown,
	version: number
): WeatherState => {
	const state = (persistedState as Partial<WeatherState>) ?? {};

	if (version < 1) {
		return defaultWeatherStore;
	}

	return {
		loading: false,
		data: state.data ?? defaultWeatherStore.data,
		hasHydrated: state.hasHydrated ?? defaultWeatherStore.hasHydrated,
		locationLabel: state.locationLabel ?? defaultWeatherStore.locationLabel,
		preferences: {
			unit: state.preferences?.unit ?? "celsius",
			zipcode: state.preferences?.zipcode ?? null,
			alertsEnabled: state.preferences?.alertsEnabled ?? false,
			gpsCoords: state.preferences?.gpsCoords ?? null,
			locationSource: state.preferences?.locationSource ?? "gps",
		},
		justFetchedManually: false,
		setJustFetchedManually: () => {},
		setLoading: () => {},
		setLocationSource: () => {},
		setGpsCoords: () => {},
		setHasHydrated: () => {},
		setData: () => {},
		setLocationLabel: () => {},
		setPreferences: () => {},
	};
};
