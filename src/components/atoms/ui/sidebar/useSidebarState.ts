"use client";

import {
  useSidebarModuleStore,
  SIDEBAR_DIMENSIONS,
  SIDEBAR_STATES,
} from "@/components/atoms/ui/sidebar/useSidebarModuleStore";

export function useSidebarState(id: string) {
  const settings = useSidebarModuleStore((s) => s.getSettings(id));
  return {
    collapsible: settings.collapsible,
    collapsedState: settings.collapsedState ?? SIDEBAR_STATES.EXPANDED,
    width: settings.width ?? SIDEBAR_DIMENSIONS.DEFAULT,
    isExpanded: settings.collapsedState === SIDEBAR_STATES.EXPANDED,
    isIcon: settings.collapsedState === SIDEBAR_STATES.ICON,
    isOffcanvas: settings.collapsedState === SIDEBAR_STATES.OFFCANVAS,
    updateSettings: (updates: Partial<typeof settings>) =>
      useSidebarModuleStore.getState().updateSettings(id, updates),
  };
}
