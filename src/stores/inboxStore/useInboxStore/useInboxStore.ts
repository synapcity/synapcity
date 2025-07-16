"use client";

import { create, StateCreator } from "zustand";
import { format, parseISO } from "date-fns";
import { migrateInboxStore } from "../migrate/migrate";
import { persist } from "zustand/middleware";

export type InboxType =
	| "text"
	| "link"
	| "image"
	| "file"
	| "snippet"
	| "converted";
export type InboxItem = {
	id: string;
	type: InboxType;
	content: string;
	createdAt: string;
	processed: boolean;
};

export type InboxState = {
	hasHydrated: boolean;
	items: InboxItem[];
	selectedDate: string | null;
};

export type InboxActions = {
	setHasHydrated: (hasHydrated: boolean) => void;
	selectDate: (date: string) => void;
	selectToday: () => void;
	getItemsByDate: (date: string) => InboxItem[];
	addItem: (item: Omit<InboxItem, "id" | "createdAt">) => void;
	getGroupedByDate: () => Record<string, InboxItem[]>;
};

export type InboxStore = InboxState & InboxActions;

export const inboxStoreInitializer: StateCreator<InboxStore> = (set, get) => ({
	items: [
		{
			id: "1",
			type: "text",
			content: "Buy oat milk",
			createdAt: new Date().toISOString(),
			processed: false,
		},
		{
			id: "2",
			type: "link",
			content: "https://developer.mozilla.org/en-US/",
			createdAt: new Date().toISOString(),
			processed: false,
		},
		{
			id: "3",
			type: "snippet",
			content: "const a = () => console.log('hi')",
			createdAt: new Date(Date.now() - 86400000).toISOString(),
			processed: false,
		},
		{
			id: "4",
			type: "link",
			content: "https://developer.mozilla.org/en-US/",
			createdAt: new Date().toISOString(),
			processed: false,
		},
		{
			id: "5",
			type: "snippet",
			content: "const a = () => console.log('hi')",
			createdAt: new Date(Date.now() - 86400000).toISOString(),
			processed: false,
		},
		{
			id: "6",
			type: "link",
			content: "https://developer.mozilla.org/en-US/",
			createdAt: new Date().toISOString(),
			processed: false,
		},
		{
			id: "7",
			type: "snippet",
			content: "const a = () => console.log('hi')",
			createdAt: new Date(Date.now() - 86400000).toISOString(),
			processed: false,
		},
	],
	hasHydrated: false,
	setHasHydrated: (hasHydrated) => set({ hasHydrated }),
	selectedDate: null,
	selectDate: (date) => set({ selectedDate: date }),
	selectToday: () => {
		const today = format(new Date(), "yyyy-MM-dd");
		set({ selectedDate: today });
	},
	getItemsByDate: (date) => {
		const groups = get().getGroupedByDate();
		return groups[date] ?? [];
	},
	getGroupedByDate: () => {
		const items = get().items;
		const groups: Record<string, InboxItem[]> = {};
		for (const item of items) {
			const date = format(parseISO(item.createdAt), "yyyy-MM-dd");
			groups[date] = groups[date] || [];
			groups[date].push(item);
		}
		return groups;
	},
	addItem: (item) => {
		const newItem: InboxItem = {
			id: crypto.randomUUID(),
			createdAt: new Date().toISOString(),
			...item,
		};
		set((state) => ({ items: [newItem, ...state.items] }));
		get().selectToday();
	},
});

export const useInboxStore = create<InboxStore>()(
	persist(inboxStoreInitializer, {
		name: "inbox-store",
		version: 2,
		migrate: migrateInboxStore,
		onRehydrateStorage: () => (state) => {
			state?.setHasHydrated(true);
		},
	})
);
