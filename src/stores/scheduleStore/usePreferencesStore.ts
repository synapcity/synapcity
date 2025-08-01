import { create } from "zustand";
import { persist } from "zustand/middleware";

type SchedulePreferences = {
	trackEventsByDefault: boolean;
	defaultCategories?: string[];
	weeklyReportEnabled: boolean;
};

export const usePreferencesStore = create<SchedulePreferences>()(
	persist(
		(set) => ({
			trackEventsByDefault: false,
			defaultCategories: ["Reading", "Exercise"],
			weeklyReportEnabled: true,
		}),
		{ name: "schedule-preferences" }
	)
);
