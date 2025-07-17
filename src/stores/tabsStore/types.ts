import type { StatusSlice, SelectionSlice } from "@/types/ui";
import type { EntityType } from "@/types/entity";

export type Tab = {
	id: string;
	entity: EntityType;
	entityId: string;
	label: string;
	type: "editor" | "code" | "image" | "custom" | string;
	content: string;
	icon?: string | null;
	color?: string | null;
	component?: string | null;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	isDefault?: boolean;
};

export type TabEntitySlice = {
	tabs: Record<EntityType, Record<string, Record<string, Tab>>>;
	createTab: (
		entity: EntityType,
		entityId: string,
		tab?: Partial<
			Omit<Tab, "id" | "entity" | "entityId" | "createdAt" | "updatedAt">
		>
	) => Tab;
	updateTab: (
		entity: EntityType,
		entityId: string,
		tabId: string,
		updates: Partial<Tab>
	) => void;
	deleteTab: (entity: EntityType, entityId: string, tabId: string) => void;
	setTabs: (entity: EntityType, entityId: string, tabs: Tab[]) => void;
	getTabs: (entity: EntityType, entityId: string) => Tab[];
	getTab: (
		entity: EntityType,
		entityId: string,
		tabId: string | null
	) => Tab | undefined;
};

export type TabUIStateSlice = {
	activeTabIdByEntity: Record<EntityType, Record<string, string | null>>;
	dirtyTabIds: string[];

	setActiveTab: (
		entity: EntityType,
		entityId: string,
		tabId: string | null
	) => void;
	getActiveTabId: (entity: EntityType, entityId: string) => string | null;

	markTabDirty: (tabId: string) => void;
	clearTabDirty: (tabId: string) => void;
	isTabDirty: (tabId: string) => boolean;
};

export type TabsStore = TabEntitySlice &
	TabUIStateSlice &
	StatusSlice &
	SelectionSlice;
