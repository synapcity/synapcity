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
			let comp = state.components[id];
			if (!comp) {
				comp = { ...defaultComponentState, ...updates };
			}
			return {
				components: {
					[id]: {
						...comp,
					},
				},
			};
		});
	},
	setCompState: (id, key, value) => {
		set((state) => {
			let comp = state.components[id];
			if (!comp) {
				comp = { ...defaultComponentState, [key]: value };
			}
			return {
				components: {
					...state.components,
					[id]: {
						...comp,
					},
				},
			};
		});
	},
	toggleCompState: (id, key) => {
		set((state) => {
			let comp = state.components[id];
			if (!comp) {
				comp = { ...defaultComponentState };
			}
			return {
				components: {
					...state.components,
					[id]: {
						...comp,
						[key]: !comp[key],
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
