import { create } from "zustand";
import { persist } from "zustand/middleware";

type SchedulePreferences = {
  trackEventsByDefault: boolean;
  defaultCategories?: string[];
  weeklyReportEnabled: boolean;
  setTrackEventsByDefault: (value: boolean) => void;
};

export const usePreferencesStore = create<SchedulePreferences>()(
  persist(
    (set) => ({
      trackEventsByDefault: false,
      setTrackEventsByDefault: (value: boolean) => set({ trackEventsByDefault: value }),
      defaultCategories: ["Reading", "Exercise"],
      weeklyReportEnabled: true,
    }),
    { name: "schedule-preferences" }
  )
);
