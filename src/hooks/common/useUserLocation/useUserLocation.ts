"use client";

import { useEffect, useState } from "react";

export interface Location {
  lat: number;
  lon: number;
}

export const useUserLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setError(`Location access denied: ${err}`);
        console.error(error);
      }
    );
  }, [error]);

  return { location, error };
};
