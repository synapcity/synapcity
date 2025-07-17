import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { migrateUIStore } from "../migrate/migrate";
import {
	createSelectionSlice,
	createHydrationSlice,
	createStatusSlice,
	createSidebarPrefsSlice,
	createPanelEntitySlice,
} from "@/stores/slices";
import type { SidebarPrefsSlice, PanelEntitySlice } from "@/types/sidebar";
import type { StatusSlice, SelectionSlice, HydrationSlice } from "@/types/ui";

type KnownKeys = "isVisible" | "isLocked" | "isExpanded";
export type ComponentUIState = Partial<Record<KnownKeys, boolean>> & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
};

export type UIState = {
	components: Record<string, ComponentUIState>;
};

export type UIActions = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setCompState: <T = any>(id: string, key: string, value: T) => void;
	setComponent: (id: string, updates: Partial<ComponentUIState>) => void;
	toggleCompState: (id: string, key: string) => void;
};

const defaultComponentState: ComponentUIState = {
	isVisible: true,
	isExpanded: false,
	isLocked: false,
};

const defaultUIState: UIState = {
	components: {
		header: { ...defaultComponentState },
		userPanel: { ...defaultComponentState },
		userPanelSidebar: { ...defaultComponentState },
	},
};

export type UIStore = UIState &
	UIActions &
	SelectionSlice &
	StatusSlice &
	HydrationSlice &
	SidebarPrefsSlice &
	PanelEntitySlice;
export const uiStoreInitializer: StateCreator<UIStore> = (set, get, store) => ({
	...defaultUIState,
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
	...createHydrationSlice(set, get, store),
	...createStatusSlice(set, get, store),
	...createSelectionSlice(set, get, store),

	...createPanelEntitySlice(set, get, store),
	...createSidebarPrefsSlice(set, get, store),
});

export const useUIStore = create<UIStore>()(
	persist(uiStoreInitializer, {
		name: "ui-store",
		version: 2,
		migrate: migrateUIStore,
		onRehydrateStorage: () => (state) => {
			state?.setHasHydrated(true);
		},
		partialize: (state) => ({
			prefsByKey: state.prefsByKey,
			panels: state.panels,
			components: state.components,
		}),
	})
);
