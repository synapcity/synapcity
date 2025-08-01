// src/hooks/navigation/useSyncTabsWithUrl/useSyncTabsWithUrl.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  useNoteTabsStore,
  useDashboardTabsStore,
  useWidgetTabsStore,
} from "@/stores/tabsStore-old/scopedTabsStore";
import { useEffect } from "react";
import { EntityType } from "@/types/refactor/entity";

export function useTabs(scope: EntityType, entityId?: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") ?? "";

  // Always call all three hooks up front
  const noteAPI = useNoteTabsStore();
  const dashboardAPI = useDashboardTabsStore();
  const widgetAPI = useWidgetTabsStore();

  // Pick the correct store instance
  const store =
    scope === "note" ? noteAPI :
      scope === "dashboard" ? dashboardAPI :
        widgetAPI;

  // Destructure everything you need
  const {
    getTabsFor,
    getActiveTab,
    setActiveTab,
    addTab: rawAddTab,
    updateTab,
    deleteTab,
  } = store;

  // Your array of tabs
  const tabs = entityId ? getTabsFor(entityId) : [];

  // Sync URL → store
  useEffect(() => {
    if (!entityId) return;
    if (tabParam) {
      setActiveTab(entityId, tabParam);
    } else {
      const last = getActiveTab(entityId);
      if (last) {
        setActiveTab(entityId, last);
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", last);
        window.history.replaceState({}, "", `${pathname}?${params}`);
      }
    }
  }, [
    entityId,
    tabParam,
    pathname,
    searchParams,
    getActiveTab,
    setActiveTab,
  ]);

  // click handler → store + push URL
  const onSelect = (tabId: string) => {
    if (!entityId) return;
    setActiveTab(entityId, tabId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    window.history.pushState({}, "", `${pathname}?${params}`);
  };

  // Curry addTab to include entityId
  const addTab = (partial: Parameters<typeof rawAddTab>[0]) =>
    entityId ? rawAddTab(partial, entityId) : undefined;

  // read activeTab
  const activeTab = entityId ? getActiveTab(entityId) : null;

  return {
    tabs,
    activeTab,
    onSelect,
    addTab,
    updateTab,
    deleteTab,
  } as const;
}
