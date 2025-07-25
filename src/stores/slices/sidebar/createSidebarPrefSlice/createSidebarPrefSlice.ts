// import type {
// 	SidebarPrefsSlice,
// 	SidebarScope,
// } from "@/types/refactor/sidebar-old";
// import { defaultNotePanels } from "@/lib/data/sidebar/defaultNotePanels";
// import { defaultDashboardPanels } from "@/lib/data/sidebar/defaultDashboardPanels";
// import { StateCreator } from "zustand";

// function generateScopeKey(scope: SidebarScope, id: string) {
// 	return `${scope}:${id}`;
// }

// export const createSidebarPrefsSlice: StateCreator<SidebarPrefsSlice> = (
// 	set,
// 	get
// ) => ({
// 	prefsByKey: {},
// 	getPrefs: (scope, id) => {
// 		const key = generateScopeKey(scope, id);
// 		const stored = get().prefsByKey[key];
// 		if (stored) return stored;

// 		const defaultPanels =
// 			scope === "note"
// 				? defaultNotePanels
// 				: scope === "dashboard"
// 				? defaultDashboardPanels
// 				: [];

// 		return {
// 			activePanel: null,
// 			panels: defaultPanels,
// 			pinned: [],
// 			hidden: [],
// 		};
// 	},
// 	setPanels: (scope, id, panels) => {
// 		const key = generateScopeKey(scope, id);
// 		set((state) => ({
// 			prefsByKey: {
// 				...state.prefsByKey,
// 				[key]: {
// 					...(state.prefsByKey[key] ?? {
// 						activePanel: null,
// 						pinned: [],
// 						hidden: [],
// 					}),
// 					panels,
// 				},
// 			},
// 		}));
// 	},

// 	addPanels: (scope, id, panels) => {
// 		const key = generateScopeKey(scope, id);
// 		set((state) => {
// 			const prev = state.prefsByKey[key]?.panels ?? [];
// 			return {
// 				prefsByKey: {
// 					...state.prefsByKey,
// 					[key]: {
// 						...(state.prefsByKey[key] ?? {
// 							activePanel: null,
// 							pinned: [],
// 							hidden: [],
// 						}),
// 						panels: [...prev, ...panels],
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
// 					activePanel: null,
// 					pinned: [],
// 					hidden: [],
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

// 	setActivePanel: (scope, id, panelId) => {
// 		const key = generateScopeKey(scope, id);
// 		const prev = get().prefsByKey[key] ?? {
// 			activePanel: null,
// 			pinned: [],
// 			hidden: [],
// 			panels: [],
// 		};
// 		set((state) => ({
// 			prefsByKey: {
// 				...state.prefsByKey,
// 				[key]: { ...prev, activePanel: panelId },
// 			},
// 		}));
// 	},

// 	togglePanelPinned: (scope, id, panelId) => {
// 		const key = generateScopeKey(scope, id);
// 		const prev = get().prefsByKey[key] ?? {
// 			activePanel: null,
// 			pinned: [],
// 			hidden: [],
// 			panels: [],
// 		};
// 		const pinned = prev.pinned.includes(panelId)
// 			? prev.pinned.filter((p) => p !== panelId)
// 			: [...prev.pinned, panelId];
// 		set((state) => ({
// 			prefsByKey: {
// 				...state.prefsByKey,
// 				[key]: { ...prev, pinned },
// 			},
// 		}));
// 	},

// 	togglePanelHidden: (scope, id, panelId) => {
// 		const key = generateScopeKey(scope, id);
// 		const prev = get().prefsByKey[key] ?? {
// 			activePanel: null,
// 			pinned: [],
// 			hidden: [],
// 			panels: [],
// 		};
// 		const hidden = prev.hidden.includes(panelId)
// 			? prev.hidden.filter((h) => h !== panelId)
// 			: [...prev.hidden, panelId];
// 		set((state) => ({
// 			prefsByKey: {
// 				...state.prefsByKey,
// 				[key]: { ...prev, hidden },
// 			},
// 		}));
// 	},
// });
