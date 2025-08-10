import { WeatherData } from "@/lib";
import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { migrateWeatherStore } from "../migrate";

export interface WeatherPreferences {
  unit: "celsius" | "fahrenheit";
  zipcode: string | null;
  alertsEnabled: boolean;
  gpsCoords?: { lat: number; lon: number } | null;
  locationSource: "gps" | "zip";
}

export interface WeatherState {
  data: WeatherData | null;
  locationLabel: string | null;
  preferences: WeatherPreferences;
  justFetchedManually: boolean;
  setJustFetchedManually: (val: boolean) => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  setData: (data: WeatherData | null) => void;
  setLocationLabel: (label: string) => void;
  setPreferences: (prefs: Partial<WeatherPreferences>) => void;
  setGpsCoords: (coords: { lat: number; lon: number } | null) => void;
  setLocationSource: (source: "gps" | "zip") => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useWeatherStore = create<WeatherState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        data: null,
        locationLabel: null,
        locationSource: "gps",
        preferences: {
          unit: "celsius",
          zipcode: null,
          alertsEnabled: false,
          gpsCoords: null,
          locationSource: "gps",
        },
        gpsCoords: null,
        hasHydrated: false,
        loading: false,
        setLoading: (loading) => set({ loading }),
        setHasHydrated: (hasHydrated) => set({ hasHydrated }),
        justFetchedManually: false,
        setJustFetchedManually: (val) => set({ justFetchedManually: val }),
        setData: (data) => {
          set({ data });
        },
        setLocationLabel: (label) => set({ locationLabel: label }),
        setPreferences: (prefs) =>
          set(() => ({
            preferences: {
              unit: prefs.unit ?? "celsius",
              alertsEnabled: prefs.alertsEnabled ?? false,
              zipcode: prefs.zipcode ?? null,
              gpsCoords: prefs.gpsCoords ?? null,
              locationSource: prefs.locationSource ?? "gps",
            },
          })),
        setGpsCoords: (coords: { lat: number; lon: number } | null) =>
          set((state) => ({
            preferences: { ...state.preferences, gpsCoords: coords },
          })),
        setLocationSource: (source: "gps" | "zip") =>
          set((state) => ({
            preferences: { ...state.preferences, locationSource: source },
          })),
      }),
      {
        name: "weather-store",
        version: 2,
        migrate: migrateWeatherStore,
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
        partialize: (state) => ({
          data: state.data,
          locationLabel: state.locationLabel,
          preferences: state.preferences,
        }),
      }
    )
  )
);
