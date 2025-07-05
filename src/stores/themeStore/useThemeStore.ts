import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { getDefaultTheme } from "@/theme/utils";
import { DEFAULT_THEME } from "@/theme/defaults";
import type { ThemePreferences } from "@/theme/types";
import type { EntityType } from "@/types/entity";
import { migrateThemeStore } from "./migrate";

export interface ScopedThemeState {
	hasHydrated: boolean;
	setHasHydrated: (hasHydrated: boolean) => void;
	globalPreferences: ThemePreferences;
	scopedPreferences: Record<EntityType, Record<string, ThemePreferences>>;
	getPreferences: (scope: EntityType, id?: string) => ThemePreferences;
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
}

export const themeStoreInitializer: StateCreator<ScopedThemeState> = (
	set,
	get
) => ({
	hasHydrated: false,
	setHasHydrated: (hasHydrated) => set({ hasHydrated }),
	globalPreferences: DEFAULT_THEME,
	scopedPreferences: {
		note: {},
		dashboard: {},
		widget: {},
	},

	getPreferences: (scope, id) => {
		if (!id) return get().globalPreferences;

		const scopedPrefs = get().scopedPreferences[scope]?.[id];

		if (!scopedPrefs || scopedPrefs.inheritsFromGlobalTheme === true) {
			return get().globalPreferences;
		}

		return {
			...getDefaultTheme(get().globalPreferences.mode),
			...scopedPrefs,
		};
	},
	initScopedPreferences: (scope, id) => {
		const global = get().globalPreferences;
		set((state) => ({
			scopedPreferences: {
				...state.scopedPreferences,
				[scope]: {
					...state.scopedPreferences[scope],
					[id]: {
						...global,
					},
				},
			},
		}));
		return global;
	},

	setPreferences: (scope, id, updates) => {
		set((state) => {
			const prev =
				state.scopedPreferences[scope]?.[id] ??
				getDefaultTheme(get().globalPreferences.mode);

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
			const prev = state.globalPreferences ?? { ...DEFAULT_THEME };
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
			globalPreferences: { ...DEFAULT_THEME },
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
});

export const useThemeStore = create<ScopedThemeState>()(
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
