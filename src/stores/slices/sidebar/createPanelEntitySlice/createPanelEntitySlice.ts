// import type { StateCreator } from "zustand";
// import { nanoid } from "nanoid";
// import type {
// 	SidebarPanel,
// 	PanelEntitySlice,
// } from "@/types/refactor/sidebar-old";

// export const createPanelEntitySlice: StateCreator<PanelEntitySlice> = (
// 	set,
// 	get
// ) => ({
// 	panels: { note: {}, dashboard: {} },

// 	createPanel: (scope, entityId, data) => {
// 		const id = nanoid();
// 		const panel = { id, ...data } as SidebarPanel;

// 		set((state) => {
// 			const byScope = state.panels[scope] || {};
// 			const byEntity = byScope[entityId] || {};
// 			return {
// 				panels: {
// 					...state.panels,
// 					[scope]: {
// 						...byScope,
// 						[entityId]: {
// 							...byEntity,
// 							[id]: panel,
// 						},
// 					},
// 				},
// 			};
// 		});

// 		return panel;
// 	},

// 	deletePanel: (scope, entityId, panelId) => {
// 		set((state) => {
// 			const byScope = state.panels[scope] || {};
// 			const byEntity = { ...(byScope[entityId] || {}) };
// 			delete byEntity[panelId];
// 			return {
// 				panels: {
// 					...state.panels,
// 					[scope]: {
// 						...byScope,
// 						[entityId]: byEntity,
// 					},
// 				},
// 			};
// 		});
// 	},

// 	setPanels: (scope, entityId, panels) => {
// 		const map = Object.fromEntries(panels.map((p) => [p.id, p]));
// 		set((state) => ({
// 			panels: {
// 				...state.panels,
// 				[scope]: {
// 					...state.panels[scope],
// 					[entityId]: map,
// 				},
// 			},
// 		}));
// 	},

// 	getPanelsRaw: (scope, entityId) => {
// 		return Object.values(get().panels[scope]?.[entityId] ?? {});
// 	},
// });
