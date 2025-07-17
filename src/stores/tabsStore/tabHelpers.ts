import { useTabsStore } from "./useTabsStore";
import type { EntityType } from "@/types/entity";

export function useTabsFor(entity: EntityType, parentId: string) {
	const getTabs = useTabsStore((s) => s.getTabs);
	return getTabs(entity, parentId) ?? [];
}
export function useActiveTab(entity: EntityType, parentId: string) {
	const getActiveTab = useTabsStore((s) => s.getActiveTabId);
	const getTab = useTabsStore((s) => s.getTab);
	const tabId = getActiveTab(entity, parentId) ?? null;
	return getTab(entity, parentId, tabId);
}
export const useTabDirty = (tabId: string) => ({
	isDirty: useTabsStore((s) => s.isTabDirty)(tabId),
	markDirty: () => useTabsStore.getState().markTabDirty(tabId),
	clearDirty: () => useTabsStore.getState().clearTabDirty(tabId),
});

export function useTabStatusFlags(tabId: string) {
	const status = useTabsStore((s) => s.getStatus)("tab", tabId);
	return {
		isSaving: status.isSaving,
		isLoading: status.isLoading,
		isDirty: status.isEditing || status.isDeleting || status.isSearching,
		error: status.error,
		lastSavedAt: status.lastSavedAt,
	};
}

export function useTabSelection(tabId: string) {
	const selected = useTabsStore((s) => s.selected["tab"]) === tabId;
	const select = useTabsStore.getState().setSelected;
	return {
		isSelected: selected,
		select: () => select("tab", tabId),
		clear: () => select("tab", null),
	};
}
