// import { useEffect, useMemo } from "react";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import { EntityType, Tab, TabType } from "@/types";
// import {
//   useNoteTabsStore,
//   useDashboardTabsStore,
//   useWidgetTabsStore,
// } from "@/stores/tabsStore/scopedTabsStore";

// const storeMap = {
//   note: useNoteTabsStore,
//   dashboard: useDashboardTabsStore,
//   widget: useWidgetTabsStore,
// } as const;

// type StoreHook = (typeof storeMap)[EntityType];

// interface UseScopedTabsOptions {
//   groupBy?: keyof Tab;
//   defaultType?: TabType;
//   modalSafe?: boolean;
// }

// export function useScopedTabsWithSync(
//   scope: EntityType,
//   entityId: string,
//   options: UseScopedTabsOptions = {}
// ) {
//   const { groupBy, defaultType = "editor", modalSafe = false } = options;

//   const store = storeMap[scope]() as ReturnType<StoreHook>;
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const tabParam = searchParams.get("tab") ?? undefined;

//   const tabs = store.getTabs(entityId);
//   const activeTab = store.getActiveTab(entityId);

//   const groupedTabs = useMemo(() => {
//     if (!groupBy) return undefined;
//     return tabs.reduce((acc, tab) => {
//       const key = (tab[groupBy] ?? "other") as string;
//       acc[key] = acc[key] ?? [];
//       acc[key].push(tab);
//       return acc;
//     }, {} as Record<string, Tab[]>);
//   }, [tabs, groupBy]);

//   // 1. Ensure at least one tab exists
//   useEffect(() => {
//     if (entityId && tabs.length === 0) {
//       store.addTab(entityId, {
//         type: defaultType,
//         label: "Untitled",
//       });
//     }
//   }, [entityId, tabs.length, defaultType, store]);

//   // 2. Auto-select first tab if none selected
//   useEffect(() => {
//     if (entityId && tabs.length > 0 && !activeTab) {
//       store.setActiveTab(entityId, tabs[0].id);
//     }
//   }, [entityId, tabs, activeTab, store]);

//   // 3. Sync from URL → store
//   useEffect(() => {
//     if (!modalSafe && entityId && tabParam) {
//       store.setActiveTab(entityId, tabParam);
//     }
//   }, [entityId, tabParam, modalSafe, store]);

//   // 4. Sync from store → URL
//   useEffect(() => {
//     if (modalSafe || !entityId || !activeTab) return;
//     const params = new URLSearchParams(searchParams.toString());
//     if (params.get("tab") !== activeTab) {
//       params.set("tab", activeTab);
//       router.replace(`${pathname}?${params.toString()}`, { scroll: false });
//     }
//   }, [activeTab, entityId, modalSafe, pathname, router, searchParams]);

//   return {
//     tabs,
//     groupedTabs,
//     activeTab,
//     addTab: (partial: Partial<Tab>) => store.addTab(entityId, partial),
//     updateTab: (id: string, updates: Partial<Tab>) =>
//       store.updateTab(entityId, id, updates),
//     deleteTab: (id: string) => store.deleteTab(entityId, id),
//     setActiveTab: (id: string) => store.setActiveTab(entityId, id),
//   };
// }
"use client";
import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTabStore } from "../../../archives/stores/refactor/stores/useTabsStore";
import type { Tab } from "../../schemas/domains/tab";
import { EntityType } from "@/types/refactor/entity";
export function useScopedTabsWithSync(
	scope: EntityType,
	entityId: string,
	options?: {
		modalSafe?: boolean;
		groupBy?: keyof Tab;
	}
) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const store = useTabStore();
	const {
		items,
		selectedItem,
		setSelectedItem,
		addItem,
		updateItem,
		purgeItem,
		ensureDefaultTab,
	} = store;

	const tabs = useMemo(
		() =>
			Object.values(items).filter(
				(tab) => tab?.entityId === entityId && !tab.deletedAt
			),
		[items, entityId]
	);

	const activeTab = selectedItem?.[entityId];

	// URL ↔ store sync
	useEffect(() => {
		if (options?.modalSafe) return;
		const tabParam = searchParams.get("tab") ?? undefined;
		if (tabParam && tabParam !== activeTab) {
			setSelectedItem(entityId, tabParam);
		} else if (!tabParam && activeTab) {
			const params = new URLSearchParams(searchParams);
			params.set("tab", activeTab);
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });
		}
	}, [
		searchParams,
		pathname,
		router,
		activeTab,
		entityId,
		setSelectedItem,
		options?.modalSafe,
	]);

	// Ensure default tab if missing
	useEffect(() => {
		if (!entityId || tabs.length > 0) return;
		ensureDefaultTab(entityId);
	}, [entityId, tabs, ensureDefaultTab]);

	const groupedTabs = useMemo(() => {
		if (!options?.groupBy) return undefined;
		return tabs.reduce<Record<string, Tab[]>>((acc, tab) => {
			const key = String(tab[options.groupBy!] ?? "other");
			if (!acc[key]) acc[key] = [];
			acc[key].push(tab);
			return acc;
		}, {});
	}, [tabs, options?.groupBy]);

	return {
		tabs,
		groupedTabs,
		activeTab,
		addTab: (tab?: Partial<Tab>) => addItem({ ...tab, entityId }),
		deleteTab: (tabId: string) => purgeItem(tabId),
		updateTab: (tabId: string, updates: Partial<Tab>) =>
			updateItem(tabId, updates),
		onSelectTab: (tabId: string) => setSelectedItem(entityId, tabId),
	};
}
