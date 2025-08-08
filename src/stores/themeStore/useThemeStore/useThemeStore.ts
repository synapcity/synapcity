import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { getDefaultTheme } from "@/theme/utils";
import { DEFAULT } from "@/theme/defaults";
import type { ThemePreferences, ThemeScope, EntityType } from "@/theme/types";
import { migrateThemeStore } from "../migrate";
import {
	resolveThemeMetadata,
	type ThemeMetadataInfo,
} from "@/theme/utils/resolveThemeMetadata";
import { createHydrationSlice } from "@/stores/slices";
import { HydrationSlice } from "@/stores/slices";

export interface ScopedThemeState {
	globalPreferences: ThemePreferences;
	scopedPreferences: Record<EntityType, Record<string, ThemePreferences>>;
	getPreferences: (scope: ThemeScope, id?: string) => ThemeMetadataInfo;
	setPreferences: (
		scope: EntityType,
		id: string,
		updates: Partial<ThemePreferences>
	) => void;
	setGlobalPreferences: (updates: Partial<ThemePreferences>) => void;
	initScopedPreferences: (scope: EntityType, id: string) => ThemePreferences;
	resetGlobalPreferences: () => void;
	resetScopedPreferences: (scope: EntityType, id: string) => void;
	toggleGlobalMode: () => void;
	toggleScopedMode: (scope: EntityType, id: string) => void;
	hasHydrated: boolean;
	setHasHydrated: (hasHydrated: boolean) => void;
}

export type ThemeStore = ScopedThemeState & HydrationSlice;

export const themeStoreInitializer: StateCreator<ThemeStore> = (
	set,
	get,
	store
) => ({
	globalPreferences: DEFAULT.THEME,
	scopedPreferences: {
		note: {},
		dashboard: {},
		widget: {},
	},

	getPreferences: (scope, id) => {
		const global = get().globalPreferences;
		const scopedPreferences = get().scopedPreferences;
		return resolveThemeMetadata({
			globalPreferences: global,
			scopedPreferences: scopedPreferences[scope as EntityType],
			entityType: scope,
			entityId: id,
		});
	},
	initScopedPreferences: (scope, id) => {
		let global;
		set((state) => {
			global = state.globalPreferences;
			return {
				scopedPreferences: {
					...state.scopedPreferences,
					[scope]: {
						...state.scopedPreferences[scope],
						[id]: {
							...global,
						},
					},
				},
			};
		});
		return global as unknown as ThemePreferences;
	},

	setPreferences: (scope, id, updates) => {
		set((state) => {
			const prev =
				state.scopedPreferences[scope]?.[id] ??
				getDefaultTheme(state.globalPreferences.mode);
			const updateSet = new Set(Object.keys(updates));
			const useGlobalTheme = updateSet.has("inheritsFromGlobalTheme");
			if (!useGlobalTheme && prev.inheritsFromGlobalTheme) {
				updates.inheritsFromGlobalTheme = false;
			}

			return {
				scopedPreferences: {
					...state.scopedPreferences,
					[scope]: {
						...state.scopedPreferences[scope],
						[id]: {
							...prev,
							...updates,
						},
					},
				},
			};
		});
	},

	setGlobalPreferences: (updates) => {
		set((state) => {
			const prev = state.globalPreferences ?? { ...DEFAULT.THEME };
			return {
				globalPreferences: {
					...prev,
					...updates,
				},
			};
		});
	},
	resetGlobalPreferences: () => {
		set(() => ({
			globalPreferences: { ...DEFAULT.THEME },
		}));
	},
	resetScopedPreferences: (scope: EntityType, id: string) => {
		set((state) => {
			const { [id]: _, ...rest } = state.scopedPreferences[scope];
			return {
				scopedPreferences: {
					...state.scopedPreferences,
					[scope]: rest,
				},
			};
		});
	},
	toggleGlobalMode: () => {
		set((state) => {
			const newMode =
				state.globalPreferences.mode === "dark" ? "light" : "dark";
			return {
				globalPreferences: {
					...state.globalPreferences,
					mode: newMode,
				},
			};
		});
	},
	toggleScopedMode: (scope, id) => {
		set((state) => {
			const currentMode =
				state.scopedPreferences[scope][id].mode ?? state.globalPreferences.mode;
			const newMode = currentMode === "dark" ? "light" : "dark";
			return {
				scopedPreferences: {
					...state.scopedPreferences,
					[scope]: {
						...state.scopedPreferences[scope],
						[id]: {
							...state.scopedPreferences[scope][id],
							mode: newMode,
						},
					},
				},
			};
		});
	},
	...createHydrationSlice(set, get, store),
});

export const useThemeStore = create<ThemeStore>()(
	persist(themeStoreInitializer, {
		name: "theme-preferences",
		version: 2,
		migrate: migrateThemeStore,
		onRehydrateStorage: () => (state) => {
			state?.setHasHydrated(true);
		},
		partialize: (state) => ({
			globalPreferences: state.globalPreferences,
			scopedPreferences: state.scopedPreferences,
		}),
	})
);
