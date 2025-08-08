import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { migrateUIStore } from "../migrate/migrate";
import {
	createSelectionSlice,
	createHydrationSlice,
	createStatusSlice,
} from "@/stores/slices";
import type {
	HydrationSlice,
	StatusSlice,
	SelectionSlice,
} from "@/stores/slices";

type KnownKeys = "isVisible" | "isLocked" | "isExpanded";
export type ComponentUIState = Partial<Record<KnownKeys, boolean>> & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
};

export type UIState = {
	components: Record<string, ComponentUIState>;
	isSiteFocus: boolean;
};

export type UIActions = {
	toggleSiteFocus: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setCompState: <T = any>(id: string, key: string, value: T) => void;
	getCompState: (id: string, key: string) => void;
	setComponent: (id: string, updates: Partial<ComponentUIState>) => void;
	toggleCompState: (id: string, key: string) => void;
};

const defaultComponentState: ComponentUIState = {
	isVisible: false,
	isExpanded: false,
	isLocked: false,
};

const defaultUIState: UIState = {
	isSiteFocus: false,
	components: {
		header: { ...defaultComponentState },
		userPanel: { ...defaultComponentState, isExpanded: false },
		userPanelSidebar: { ...defaultComponentState, isExpanded: false },
		scheduleModal: { isVisible: false },
		notesSidebar: { ...defaultComponentState },
		breadcrumbs: {...defaultComponentState},
		dashboardsSidebar: {...defaultComponentState},
		mainSidebar: {...defaultComponentState}
	},
};

export type UIStore = UIState &
	UIActions &
	SelectionSlice &
	StatusSlice &
	HydrationSlice;

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
	getCompState: (id, key) => {
		const compState = get().components[id];
		if (!compState) {
			set((state) => ({
				...state,
				components: { ...state.components, [id]: { ...defaultComponentState } },
			}));
		}
		return get().components[id][key];
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
	toggleScheduleModal: () =>
		set((state) => ({
			components: {
				scheduleModal: {
					isVisible: !state.components.scheduleModal.isVisible,
				},
			},
		})),
	toggleSiteFocus: () => set((s) => ({ isSiteFocus: !s.isSiteFocus })),
	isSiteFocus: false,
	...createHydrationSlice(set, get, store),
	...createStatusSlice(set, get, store),
	...createSelectionSlice(set, get, store),
});

export const useUIStore = create<UIStore>()(
	persist(uiStoreInitializer, {
		name: "ui-store",
		version: 2,
		migrate: migrateUIStore,
		onRehydrateStorage: () => (state) => {
			state?.setHasHydrated(true);
		},
		partialize: (state) => {
			return {
				...state,
				components: state.components ?? {},
			} as UIStore;
		},
	})
);
