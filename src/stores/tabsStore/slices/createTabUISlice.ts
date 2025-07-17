import type { StateCreator } from "zustand";
import { TabUIStateSlice } from "../types";

export const createTabUISlice: StateCreator<TabUIStateSlice> = (set, get) => ({
	activeTabIdByEntity: {},
	dirtyTabIds: [],

	setActiveTab: (entity, entityId, tabId) =>
		set((state) => ({
			activeTabIdByEntity: {
				...state.activeTabIdByEntity,
				[entity]: {
					...(state.activeTabIdByEntity[entity] ?? {}),
					[entityId]: tabId,
				},
			},
		})),

	getActiveTabId: (entity, entityId) =>
		get().activeTabIdByEntity[entity]?.[entityId] ?? null,

	markTabDirty: (tabId) =>
		set((state) => ({
			dirtyTabIds: state.dirtyTabIds.includes(tabId)
				? state.dirtyTabIds
				: [...state.dirtyTabIds, tabId],
		})),

	clearTabDirty: (tabId) =>
		set((state) => ({
			dirtyTabIds: state.dirtyTabIds.filter((id) => id !== tabId),
		})),

	isTabDirty: (tabId) => get().dirtyTabIds.includes(tabId),
});
