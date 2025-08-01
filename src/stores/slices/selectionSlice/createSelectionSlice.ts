import type { StateCreator } from "zustand";

export interface SelectionSlice {
	selected: Record<string, string | null>;
	setSelected: (scope: string, id: string | null) => void;

	sidebar: Record<string, { activeItem: string | null }>;
	setSidebarItem: (scope: string, item: string | null) => void;

	clearSelected: (scope?: string) => void;
	clearSidebarItem: (scope?: string) => void;
	getSelected?: (scope: string) => string | null;
}

export const createSelectionSlice: StateCreator<
	SelectionSlice,
	[],
	[],
	SelectionSlice
> = (set, get) => ({
	// maps "namespace:scope" → selected item ID
	selected: {},
	setSelected: (scope, id, namespace = "") =>
		set((state) => ({
			selected: {
				...state.selected,
				[`${namespace}:${scope}`]: id,
			},
		})),
	clearSelected: (scope) =>
		set((state) => {
			if (!scope) return { selected: {} };
			const next = { ...state.selected };
			delete next[scope];
			return { selected: next };
		}),
	getSelected: (scope, namespace = "") =>
		get().selected[`${namespace}:${scope}`] ?? null,

	// maps "scope" → sidebar { activeItem }
	sidebar: {},
	setSidebarItem: (scope, item) =>
		set((state) => ({
			sidebar: {
				...state.sidebar,
				[scope]: { activeItem: item },
			},
		})),
	clearSidebarItem: (scope) =>
		set((state) => {
			if (!scope) return { sidebar: {} };
			const next = { ...state.sidebar };
			delete next[scope];
			return { sidebar: next };
		}),
});
