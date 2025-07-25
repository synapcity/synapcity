import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { migrateMetadataStore } from "../migrate";
import {
	createHydrationSlice,
	createStatusSlice,
	createSelectionSlice,
	type HydrationSlice,
	type StatusSlice,
	type SelectionSlice,
} from "@/stores/slices";

type MetadataSlice = {
	language: string;
	themeMode: "light" | "dark";
	setLanguage: (lang: string) => void;
	setThemeMode: (mode: "light" | "dark") => void;
};

export type MetadataStore = MetadataSlice &
	SelectionSlice &
	StatusSlice &
	HydrationSlice;

export const metadataStoreInitializer: StateCreator<MetadataStore> = (
	set,
	get,
	store
) => ({
	language: "en",
	themeMode: "light",
	setLanguage: (language) => set({ language }),
	setThemeMode: (themeMode) => set({ themeMode }),
	...createSelectionSlice(set, get, store),
	...createStatusSlice(set, get, store),
	...createHydrationSlice(set, get, store),
});

export const useMetadataStore = create<MetadataStore>()(
	persist(metadataStoreInitializer, {
		name: "metadata-store",
		version: 1,
		migrate: migrateMetadataStore,
		partialize: (state) => ({
			language: state.language,
			themeMode: state.themeMode,
		}),
		onRehydrateStorage: () => (state) => {
			state?.setHasHydrated(true);
		},
	})
);
