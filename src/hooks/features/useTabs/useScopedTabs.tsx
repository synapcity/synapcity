// "use client"

// import { useTabStore } from "@/stores/refactor/stores/useTabsStore";
// import { createTab, Tab, TabEntityType } from "@/schemas/domains/tab";

// export function useScopedTabs(scope: TabEntityType, entityId?: string) {
//   const getAllTabs = useTabStore(s => s.items);
//   const getItemById = useTabStore(s => s.getItemById)
//   const activeTabId = scope && entityId && getItemById && getItemById(entityId)
//   const setActiveTab = useTabStore(s => s.setActiveTab);
//   const addTabRaw = useTabStore(s => s.addItem);
//   const updateTabRaw = useTabStore(s => s.updateItem);
//   const deleteTabRaw = useTabStore(s => s.purgeItem);

//   const tabs = Object.values(getAllTabs ?? {}).filter(t => t.entity === scope && t.entityId === entityId) ?? {};
//   const activeTab = tabs.find(t => t.id === activeTabId);

//   const onSelectTab = (tabId: string) => {
//     if (entityId) setActiveTab(scope, entityId, tabId);
//   };

//   const addTab = async (partial: Partial<Tab>) => {
//     if (!entityId) return;

//     const newTab = createTab({
//       ...partial,
//       entity: scope,
//       entityId,
//     });

//     const added = await addTabRaw(newTab);

//     setActiveTab(scope, entityId, added.id);

//     const url = new URL(window.location.href);
//     url.searchParams.set("tab", added.id);
//     window.history.replaceState(null, "", url.toString());

//     return added;
//   };

//   const updateTab = (tabId: string, updates: Partial<Tab>) => {
//     return updateTabRaw(tabId, updates);
//   };

//   const deleteTab = (tabId: string) => {
//     const foundTab = getItemById(tabId)
//     if (!foundTab) return;
//     return deleteTabRaw(tabId);
//   };

//   const ensureDefaultTab = () => {
//     if (!entityId || tabs && tabs.length > 0) return;

//     const newTab = addTab({
//       entity: scope,
//       entityId
//     });

//     return newTab
//   };

//   return {
//     tabs,
//     activeTab,
//     onSelectTab,
//     addTab,
//     updateTab,
//     deleteTab,
//     ensureDefaultTab,
//   };
// }
