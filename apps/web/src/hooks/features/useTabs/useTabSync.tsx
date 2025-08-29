// // "use client";
// // import { useEffect } from "react";
// // import { useSearchParams } from "next/navigation";
// // import { useNoteTabsStore, useDashboardTabsStore, useWidgetTabsStore } from "@/stores/tabsStore/scopedTabsStore";
// // import { EntityType } from "@/theme";

// // export function useTabSync(
// //   scope: EntityType,
// //   entityId: string | undefined,
// // ) {
// //   const params = useSearchParams();
// //   const tabParam = params.get("tab") ?? undefined;
// //   const store = { note: useNoteTabsStore(), dashboard: useDashboardTabsStore(), widget: useWidgetTabsStore() }[scope];
// //   const { getActiveTab, ensureDefaultTab } = store ?? { getActiveTab: () => { }, ensureDefaultTab: () => { } }
// //   const activeTab = entityId ? getActiveTab(entityId) : undefined;

// //   useEffect(() => {
// //     if (entityId && !tabParam) {
// //       const tab = activeTab ?? ensureDefaultTab(entityId);
// //       const url = new URL(window.location.href);
// //       url.searchParams.set("tab", tab ?? "");
// //       window.history.replaceState(null, "", url.toString());
// //     }
// //   }, [entityId, tabParam, activeTab, ensureDefaultTab]);

// //   useEffect(() => {
// //     if (entityId && activeTab && activeTab !== tabParam) {
// //       const url = new URL(window.location.href);
// //       url.searchParams.set("tab", activeTab);
// //       window.history.pushState(null, "", url.toString());
// //     }
// //   }, [entityId, activeTab, tabParam]);
// // }
// "use client";
// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { useTabStore } from "@/stores/refactor/stores/useTabsStore";
// import { TabEntityType } from "@/schemas/domains/tab";

// export function useTabSync(scope: TabEntityType, entityId?: string) {
//   const params = useSearchParams();
//   const tabParam = params.get("tab") ?? undefined;
//   const setActiveTab = useTabStore((s) => s.setSelected);
//   const items = useTabStore((s) => s.items) ?? {}

//   const activeTabIdByEntity = useTabStore(s => s.selected)
//   const activeTabId = activeTabIdByEntity[entityId ?? ""]

//   const entityTabs = Object.values(items ?? {}).filter(
//     (tab) => tab?.entity === scope && tab.entityId === entityId
//   ) ?? {}

//   useEffect(() => {
//     if (!entityId || !tabParam || !setActiveTab) return;
//     if (tabParam !== activeTabId) {
//       setActiveTab(scope, entityId, tabParam);
//     }
//     // const defaultTabId = activeTabId ?? entityTabs[0]?.id ?? ""
//   }, [entityId, tabParam, activeTabId, setActiveTab, scope]);

//   useEffect(() => {
//     if (!entityId) return;
//     const url = new URL(window.location.href);
//     if (activeTabId) {
//       url.searchParams.set("tab", activeTabId);
//     } else {
//       // setActiveTab(scope, entityId, defaultTabId)
//       // url.searchParams.set("tab", defaultTabId)
//     }
//     window.history.replaceState(null, "", url.toString());
//   }, [entityId, activeTabId]);
// }
