import type { StateCreator } from "zustand";
import { nanoid } from "nanoid";
import { SidebarScope, SidebarPanel } from "../types";

export interface PanelRegistrySlice {
	definitions: Record<SidebarScope, Record<string, SidebarPanel[]>>;

	createPanel(
		scope: SidebarScope,
		entityId: string,
		data: Omit<SidebarPanel, "id">
	): SidebarPanel;

	deletePanel(scope: SidebarScope, entityId: string, panelId: string): void;

	setPanels(
		scope: SidebarScope,
		entityId: string,
		panels: SidebarPanel[]
	): void;

	getPanels(scope: SidebarScope, entityId: string): SidebarPanel[];
}

export const createPanelRegistrySlice: StateCreator<PanelRegistrySlice> = (
	set,
	get
) => ({
	definitions: {
		global: {},
		note: {},
		dashboard: {},
		resource: {},
		annotation: {},
		connection: {},
	},

	createPanel(scope, entityId, data) {
		const newPanel: SidebarPanel = { id: nanoid(), ...data };
		set((s) => {
			const prev = s.definitions[scope][entityId] || [];
			return {
				definitions: {
					...s.definitions,
					[scope]: {
						...s.definitions[scope],
						[entityId]: [...prev, newPanel],
					},
				},
			};
		});
		return newPanel;
	},

	deletePanel(scope, entityId, panelId) {
		set((s) => {
			const arr = s.definitions[scope][entityId] || [];
			return {
				definitions: {
					...s.definitions,
					[scope]: {
						...s.definitions[scope],
						[entityId]: arr.filter((p) => p.id !== panelId),
					},
				},
			};
		});
	},

	setPanels(scope, entityId, panels) {
		set((s) => ({
			definitions: {
				...s.definitions,
				[scope]: {
					...s.definitions[scope],
					[entityId]: panels,
				},
			},
		}));
	},

	getPanels(scope, entityId) {
		return get().definitions[scope][entityId] || [];
	},
});
