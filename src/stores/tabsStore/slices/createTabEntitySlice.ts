import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import type { Tab, TabEntitySlice } from "../types";

export const createTabEntitySlice: StateCreator<
	TabEntitySlice,
	[],
	[],
	TabEntitySlice
> = (set, get) => ({
	tabs: {},

	createTab: (entity, entityId, tabData = {}) => {
		const id = nanoid();
		const now = new Date().toISOString();
		const newTab: Tab = {
			id,
			entity,
			entityId,
			label: tabData.label ?? "New Tab",
			type: tabData.type ?? "editor",
			content: tabData.content ?? "",
			icon: tabData.icon ?? null,
			color: tabData.color ?? null,
			component: tabData.component,
			createdAt: now,
			updatedAt: now,
			isDefault: tabData.isDefault ?? false,
			deletedAt: null,
		};

		set((state) => ({
			tabs: {
				...state.tabs,
				[entity]: {
					...state.tabs[entity],
					[entityId]: {
						...(state.tabs[entity]?.[entityId] ?? {}),
						[id]: newTab,
					},
				},
			},
		}));

		return newTab;
	},

	updateTab: (entity, entityId, tabId, updates) => {
		const existing = get().tabs[entity]?.[entityId]?.[tabId];
		if (!existing) return;

		const updated: Tab = {
			...existing,
			...updates,
			updatedAt: new Date().toISOString(),
		};

		set((state) => ({
			tabs: {
				...state.tabs,
				[entity]: {
					...state.tabs[entity],
					[entityId]: {
						...state.tabs[entity]?.[entityId],
						[tabId]: updated,
					},
				},
			},
		}));
	},

	deleteTab: (entity, entityId, tabId) => {
		set((state) => {
			const { [tabId]: _, ...rest } = state.tabs[entity]?.[entityId] ?? {};
			return {
				tabs: {
					...state.tabs,
					[entity]: {
						...state.tabs[entity],
						[entityId]: rest,
					},
				},
			};
		});
	},

	setTabs: (entity, entityId, tabs) => {
		const tabMap = Object.fromEntries(tabs.map((tab) => [tab.id, tab]));
		set((state) => ({
			tabs: {
				...state.tabs,
				[entity]: {
					...state.tabs[entity],
					[entityId]: tabMap,
				},
			},
		}));
	},

	getTabs: (entity, entityId) => {
		return Object.values(get().tabs[entity]?.[entityId] ?? {});
	},

	getTab: (entity, entityId, tabId) => {
		return get().tabs[entity]?.[entityId]?.[tabId];
	},
});
