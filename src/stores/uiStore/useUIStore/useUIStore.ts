import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { migrateUIStore } from "../migrate/migrate";

type KnownKeys = "isVisible" | "isLocked" | "isExpanded";
export type ComponentUIState = Partial<Record<KnownKeys, boolean>> & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
};

export type UIState = {
	hasHydrated: boolean;
	components: Record<string, ComponentUIState>;
};

export type UIActions = {
	setHasHydrated: (hasHydrated: boolean) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setCompState: <T = any>(id: string, key: string, value: T) => void;
	setComponent: (id: string, updates: Partial<ComponentUIState>) => void;
	toggleCompState: (id: string, key: string) => void;
};

const defaultUIState: UIState = {
	hasHydrated: false,
	components: {},
};

const defaultComponentState: ComponentUIState = {
	isVisible: true,
	isExpanded: false,
	isLocked: false,
};

export const uiStoreInitializer: StateCreator<UIState & UIActions> = (set) => ({
	...defaultUIState,
	setHasHydrated: (hasHydrated) => set({ hasHydrated }),
	setComponent: (id, updates) => {
		set((state) => {
			const prev = state.components[id] ?? { ...defaultComponentState };
			return {
				components: {
					...state.components,
					[id]: {
						...prev,
						...updates,
					},
				},
			};
		});
	},
	setCompState: (id, key, value) => {
		set((state) => {
			const prev = state.components[id] ?? { ...defaultComponentState };
			return {
				components: {
					...state.components,
					[id]: {
						...prev,
						[key]: value,
					},
				},
			};
		});
	},
	toggleCompState: (id, key) => {
		set((state) => {
			const prev = state.components[id] ?? { ...defaultComponentState };
			return {
				components: {
					...state.components,
					[id]: {
						...prev,
						[key]: !prev[key],
					},
				},
			};
		});
	},
});

export const useUIStore = create<UIState & UIActions>()(
	persist(uiStoreInitializer, {
		name: "ui-store",
		version: 2,
		migrate: migrateUIStore,
		onRehydrateStorage: () => (state) => {
			state?.setHasHydrated(true);
		},
	})
);
