"use client";

import { useState, useCallback } from "react";
import { updateNoteTabUrl as updateUrl } from "@/lib/notes/updateNoteTabUrl";
import { confirmDelete } from "@/lib/modal/confirmDelete";
import { showToast } from "@/lib/toast";
import { Tab, useTabsFor, useTabsStore } from "@/stores";
import type { EntityType } from "@/types/refactor/entity";

export function useTabsForEntity(entityType: EntityType, entityId: string) {
	const tabs = useTabsFor(entityType, entityId);
	const selectedTabId = useTabsStore((s) => s.activeTabIdByEntity[entityId]);
	const setActiveTab = useTabsStore((s) => s.setActiveTab);
	const createTab = useTabsStore((s) => s.createTab);
	const updateTab = useTabsStore((s) => s.updateTab);
	const deleteTab = useTabsStore((s) => s.deleteTab);

	const [newTabIndex, setNewTabIndex] = useState(1);

	const handleAddTab = useCallback(() => {
		try {
			const label = `New ${newTabIndex}`;
			const newTab: Tab = createTab(entityType, entityId, {
				label,
				type: "editor",
				icon: "lucide:file-text",
			});
			setActiveTab(entityType, entityId, newTab.id);

			if (entityType === "note") updateUrl(entityId, newTab.id);

			setNewTabIndex((i) => i + 1);

			showToast.success(`“${label}” has been added.`, {
				entityId,
			});
		} catch (err) {
			showToast.error(`Error creating tab: ${(err as Error).message}`, {
				entityId,
			});
		}
	}, [createTab, newTabIndex, entityId, setActiveTab, entityType]);

	const handleRename = useCallback(
		(id: string, newLabel: string) => {
			const options = {
				entityId,
				duration: 300,
			};
			try {
				updateTab(entityType, entityId, id, { label: newLabel });
				showToast.info(`Renaming tab to ${newLabel}...`, options);
			} catch (err) {
				showToast.error(`Rename failed: ${(err as Error).message}`, options);
			} finally {
				showToast.success(`Tab renamed to ${newLabel}`, options);
			}
		},
		[entityId, entityType, updateTab]
	);

	const handleDelete = useCallback(
		async (id: string, label?: string) => {
			try {
				const confirmed = await confirmDelete({
					title: "Delete tab?",
					description: `Are you sure you want to delete “${label || id}”?`,
				});

				if (!confirmed) return;

				deleteTab(entityType, entityId, id);
				showToast.success(`“${label || id}” has been removed.`, {
					entityId,
				});
			} catch (err) {
				showToast.error(`Delete failed: ${(err as Error).message}`, {
					entityId,
				});
			}
		},
		[entityId, entityType, deleteTab]
	);

	return {
		tabs,
		selectedTabId,
		handleAddTab,
		handleRename,
		handleDelete,
	};
}
