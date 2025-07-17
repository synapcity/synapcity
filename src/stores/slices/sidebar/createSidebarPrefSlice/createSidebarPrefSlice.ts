// import type { StateCreator } from "zustand";
// import { SidebarPrefs, SidebarScope } from "./types";
// import { EntityType } from "@/types/entity";
// import { SidebarPanel } from "@/types/sidebar";
// import { defaultNotePanels } from "@/lib/data/sidebar";
// import { defaultDashboardPanels } from "@/lib/data/sidebar/defaultDashboardPanels";

// function generateScopeKey(scope: EntityType, id: string) {
// 	return `${scope}:${id}`;
// }
// export type SidebarPrefsSlice = {
// 	/** key = `${scope}:${entityId}` */
// 	prefsByKey: Record<string, SidebarPrefs>;
// 	setActivePanel: (
// 		scope: SidebarScope,
// 		entityId: string,
// 		panelId: string | null
// 	) => void;
// 	togglePanelPinned: (
// 		scope: SidebarScope,
// 		entityId: string,
// 		panelId: string
// 	) => void;
// 	togglePanelHidden: (
// 		scope: SidebarScope,
// 		entityId: string,
// 		panelId: string
// 	) => void;
// 	setPanels: (scope: SidebarScope, id: string, panels: SidebarPanel[]) => void;
// 	addPanels: (scope: SidebarScope, id: string, panels: SidebarPanel[]) => void;
// 	resetToDefault: (scope: SidebarScope, id: string) => void;
// };

// export const createSidebarPrefsSlice: StateCreator<SidebarPrefsSlice> = (
// 	set,
// 	_get
// ) => ({
// 	prefsByKey: {},
// 	setPanels: (scope, id, panels) => {
// 		const key = generateScopeKey(scope, id);
// 		set((state) => ({
// 			prefsByKey: {
// 				...state.prefsByKey,
// 				[key]: {
// 					...state.prefsByKey[key],
// 					panels,
// 				},
// 			},
// 		}));
// 	},
// 	addPanels: (scope, id, panels) => {
// 		const key = generateScopeKey(scope, id);
// 		set((state) => {
// 			const prev = state.prefsByKey[key]?.panels;
// 			const updatedPanels = [...prev, ...panels];
// 			return {
// 				prefsByKey: {
// 					...state.prefsByKey,
// 					[key]: {
// 						...state.prefsByKey[key],
// 						panels: updatedPanels,
// 					},
// 				},
// 			};
// 		});
// 	},
// 	resetToDefault: (scope, id) => {
// 		const key = generateScopeKey(scope, id);
// 		set((state) => ({
// 			prefsByKey: {
// 				...state.prefsByKey,
// 				[key]: {
// 					...state.prefsByKey[key],
// 					panels:
// 						scope === "note"
// 							? defaultNotePanels
// 							: scope === "dashboard"
// 							? defaultDashboardPanels
// 							: [],
// 				},
// 			},
// 		}));
// 	},

// 	setActivePanel: (scope, id, panelId) =>
// 		set((state) => {
// 			const key = generateScopeKey(scope, id);
// 			const prev = state.prefsByKey[key] ?? {
// 				activePanel: null,
// 				pinned: [],
// 				hidden: [],
// 			};
// 			return {
// 				prefsByKey: {
// 					...state.prefsByKey,
// 					[key]: { ...prev, activePanel: panelId },
// 				},
// 			};
// 		}),

// 	togglePanelPinned: (scope, id, panelId) =>
// 		set((state) => {
// 			const key = generateScopeKey(scope, id);
// 			const prev = state.prefsByKey[key] ?? {
// 				activePanel: null,
// 				pinned: [],
// 				hidden: [],
// 			};
// 			const pinned = prev.pinned.includes(panelId)
// 				? prev.pinned.filter((p) => p !== panelId)
// 				: [...prev.pinned, panelId];
// 			return {
// 				prefsByKey: {
// 					...state.prefsByKey,
// 					[key]: { ...prev, pinned },
// 				},
// 			};
// 		}),

// 	togglePanelHidden: (scope, id, panelId) =>
// 		set((state) => {
// 			const key = generateScopeKey(scope, id);
// 			const prev = state.prefsByKey[key] ?? {
// 				activePanel: null,
// 				pinned: [],
// 				hidden: [],
// 			};
// 			const hidden = prev.hidden.includes(panelId)
// 				? prev.hidden.filter((p) => p !== panelId)
// 				: [...prev.hidden, panelId];
// 			return {
// 				prefsByKey: {
// 					...state.prefsByKey,
// 					[key]: { ...prev, hidden },
// 				},
// 			};
// 		}),
// });
import type { SidebarPrefsSlice, SidebarScope } from "@/types/sidebar";
import { defaultNotePanels } from "@/lib/data/sidebar/defaultNotePanels";
import { defaultDashboardPanels } from "@/lib/data/sidebar/defaultDashboardPanels";
import { StateCreator } from "zustand";

function generateScopeKey(scope: SidebarScope, id: string) {
	return `${scope}:${id}`;
}

export const createSidebarPrefsSlice: StateCreator<SidebarPrefsSlice> = (
	set,
	get
) => ({
	prefsByKey: {},

	setPanels: (scope, id, panels) => {
		const key = generateScopeKey(scope, id);
		set((state) => ({
			prefsByKey: {
				...state.prefsByKey,
				[key]: {
					...(state.prefsByKey[key] ?? {
						activePanel: null,
						pinned: [],
						hidden: [],
					}),
					panels,
				},
			},
		}));
	},

	addPanels: (scope, id, panels) => {
		const key = generateScopeKey(scope, id);
		set((state) => {
			const prev = state.prefsByKey[key]?.panels ?? [];
			return {
				prefsByKey: {
					...state.prefsByKey,
					[key]: {
						...(state.prefsByKey[key] ?? {
							activePanel: null,
							pinned: [],
							hidden: [],
						}),
						panels: [...prev, ...panels],
					},
				},
			};
		});
	},

	resetToDefault: (scope, id) => {
		const key = generateScopeKey(scope, id);
		set((state) => ({
			prefsByKey: {
				...state.prefsByKey,
				[key]: {
					activePanel: null,
					pinned: [],
					hidden: [],
					panels:
						scope === "note"
							? defaultNotePanels
							: scope === "dashboard"
							? defaultDashboardPanels
							: [],
				},
			},
		}));
	},

	setActivePanel: (scope, id, panelId) => {
		const key = generateScopeKey(scope, id);
		const prev = get().prefsByKey[key] ?? {
			activePanel: null,
			pinned: [],
			hidden: [],
			panels: [],
		};
		set((state) => ({
			prefsByKey: {
				...state.prefsByKey,
				[key]: { ...prev, activePanel: panelId },
			},
		}));
	},

	togglePanelPinned: (scope, id, panelId) => {
		const key = generateScopeKey(scope, id);
		const prev = get().prefsByKey[key] ?? {
			activePanel: null,
			pinned: [],
			hidden: [],
			panels: [],
		};
		const pinned = prev.pinned.includes(panelId)
			? prev.pinned.filter((p) => p !== panelId)
			: [...prev.pinned, panelId];
		set((state) => ({
			prefsByKey: {
				...state.prefsByKey,
				[key]: { ...prev, pinned },
			},
		}));
	},

	togglePanelHidden: (scope, id, panelId) => {
		const key = generateScopeKey(scope, id);
		const prev = get().prefsByKey[key] ?? {
			activePanel: null,
			pinned: [],
			hidden: [],
			panels: [],
		};
		const hidden = prev.hidden.includes(panelId)
			? prev.hidden.filter((h) => h !== panelId)
			: [...prev.hidden, panelId];
		set((state) => ({
			prefsByKey: {
				...state.prefsByKey,
				[key]: { ...prev, hidden },
			},
		}));
	},
});
