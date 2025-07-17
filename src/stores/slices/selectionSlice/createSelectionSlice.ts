import type { StateCreator } from "zustand";
import type { SelectionSlice } from "@/types/ui";

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
