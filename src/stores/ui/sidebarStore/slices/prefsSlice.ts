import type { StateCreator } from "zustand";
import { defaultNotePanels, defaultDashboardPanels } from "@/lib/data/sidebar";
import { SidebarPanel, SidebarScope, SidebarPrefs } from "../types";

export interface SidebarPrefsSlice {
  prefsByKey: Record<string, SidebarPrefs>;

  getPrefs(scope: SidebarScope, entityId: string): SidebarPrefs;
  setActivePanel(scope: SidebarScope, entityId: string, panelId: string | null): void;
  togglePanelPinned(scope: SidebarScope, entityId: string, panelId: string): void;
  togglePanelHidden(scope: SidebarScope, entityId: string, panelId: string): void;
  setPanels(scope: SidebarScope, entityId: string, panels: SidebarPanel[]): void;
  addPanels(scope: SidebarScope, entityId: string, panels: SidebarPanel[]): void;
  resetToDefault(scope: SidebarScope, entityId: string): void;
}

function defaults(scope: SidebarScope): SidebarPrefs {
  return {
    activePanel: null,
    pinned: [],
    hidden: [],
    panels:
      scope === "note" ? defaultNotePanels : scope === "dashboard" ? defaultDashboardPanels : [],
  };
}

export const createSidebarPrefsSlice: StateCreator<SidebarPrefsSlice> = (set, get) => ({
  prefsByKey: {},

  getPrefs(scope, entityId) {
    const key = `${scope}:${entityId}`;
    return get().prefsByKey[key] ?? defaults(scope);
  },

  setActivePanel(scope, entityId, panelId) {
    const key = `${scope}:${entityId}`;
    const prev = get().getPrefs(scope, entityId);
    set((s) => ({
      prefsByKey: {
        ...s.prefsByKey,
        [key]: { ...prev, activePanel: panelId },
      },
    }));
  },

  togglePanelPinned(scope, entityId, panelId) {
    const key = `${scope}:${entityId}`;
    const { pinned, ...prev } = get().getPrefs(scope, entityId);
    const next = pinned.includes(panelId)
      ? pinned.filter((p) => p !== panelId)
      : [...pinned, panelId];
    set((s) => ({
      prefsByKey: {
        ...s.prefsByKey,
        [key]: { ...prev, pinned: next },
      },
    }));
  },

  togglePanelHidden(scope, entityId, panelId) {
    const key = `${scope}:${entityId}`;
    const { hidden, ...prev } = get().getPrefs(scope, entityId);
    const next = hidden.includes(panelId)
      ? hidden.filter((h) => h !== panelId)
      : [...hidden, panelId];
    set((s) => ({
      prefsByKey: {
        ...s.prefsByKey,
        [key]: { ...prev, hidden: next },
      },
    }));
  },

  setPanels(scope, entityId, panels) {
    const key = `${scope}:${entityId}`;
    const prev = get().getPrefs(scope, entityId);
    set((s) => ({
      prefsByKey: {
        ...s.prefsByKey,
        [key]: { ...prev, panels },
      },
    }));
  },

  addPanels(scope, entityId, newPanels) {
    const key = `${scope}:${entityId}`;
    const prev = get().getPrefs(scope, entityId);
    set((s) => ({
      prefsByKey: {
        ...s.prefsByKey,
        [key]: { ...prev, panels: [...prev.panels, ...newPanels] },
      },
    }));
  },

  resetToDefault(scope, entityId) {
    const key = `${scope}:${entityId}`;
    set((s) => ({
      prefsByKey: {
        ...s.prefsByKey,
        [key]: defaults(scope),
      },
    }));
  },
});
