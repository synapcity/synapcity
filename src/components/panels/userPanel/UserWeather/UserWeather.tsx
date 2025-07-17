"use client";

import { useEffect, useState } from "react";
import { useWeatherEffect, useLocalStorage } from "@/hooks";
import { useWeatherStore } from "@/stores";
import { cn } from "@/utils";
import { useModalStore } from "@/stores/modalStore";
import { Icon, SkeletonOrLoading } from "@/components";
import { WeatherSettingsModal } from "./WeatherSettingsModal";

export const UserWeather = () => {
  const { setLocationLabel, setGpsCoords, setLoading: setWeatherLoading } = useWeatherStore();
  const data = useWeatherStore(s => s.data);
  const locationLabel = useWeatherStore(s => s.locationLabel);
  const preferences = useWeatherStore(s => s.preferences);
  const weatherLoading = useWeatherStore(s => s.loading)
  const [locationPermission, setLocationPermission] = useLocalStorage("location-permission", false);
  const [error, setError] = useState<string | null>(null);
  const openModal = useModalStore((s) => s.openModal);

  const { fetchAndUpdate } = useWeatherEffect();

  useEffect(() => {
    if (data) {
      setWeatherLoading(false);
      return;
    }

    if (!locationPermission && !preferences.zipcode && !preferences.gpsCoords && navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          setLocationPermission(true);

          const { latitude, longitude } = pos.coords;
          setLocationPermission(true);
          setGpsCoords({ lat: latitude, lon: longitude });

          try {
            const res = await fetch(`/api/location-reverse?lat=${latitude}&lon=${longitude}`);
            const result = await res.json();
            if (result?.locationLabel) setLocationLabel(result.locationLabel);
          } catch {
          }

          setWeatherLoading(false);
        },
        () => {
          setError("Location denied. Set a ZIP code manually.");
          setWeatherLoading(false);
        }
      );
    } else {
      setWeatherLoading(false);
    }
  }, [data, locationPermission, preferences.gpsCoords, preferences.zipcode, setGpsCoords, setLocationLabel, setLocationPermission, setWeatherLoading]);

  if (weatherLoading) return <SkeletonOrLoading isLoading={!!weatherLoading} />
  if (error) return <div className="text-red-500 text-sm">{error}</div>;
  if (!data) return null;

  const temperature = preferences.unit === "fahrenheit"
    ? data.temperature.fahrenheit
    : data.temperature.celsius;

  return (
    <button
      onClick={() => openModal("weatherSettings", {
        title: "Weather Settings",
        component: () => <WeatherSettingsModal />,
        onSubmit: () => fetchAndUpdate()
      })}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md group",
        "bg-background text-foreground border border-transparent hover:border-border shadow-sm text-sm hover:bg-muted"
      )}
    >
      <span className="text-lg">{data.icon}</span>
      <span className="flex items-center gap-4">
        {temperature}°{preferences.unit === "fahrenheit" ? "F" : "C"}
        <span className="text-muted-foreground hidden group-hover:flex gap-2"> <Icon name="mapPin" tooltip={locationLabel ?? undefined} /></span>
      </span>
    </button>
  );
};
