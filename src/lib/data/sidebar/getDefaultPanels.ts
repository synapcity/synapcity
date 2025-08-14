/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultNotePanels } from "./defaultNotePanels";
import { defaultDashboardPanels } from "./defaultDashboardPanels";
import type { SidebarPanel, SidebarScope } from "@/stores/ui/sidebarStore";
import { sharedPanelMeta } from "./sharedPanelMeta";

export function getDefaultPanels(scope: SidebarScope): SidebarPanel[] {
  switch (scope) {
    case "note":
      return (defaultNotePanels ?? []).map((p) => ({
        ...p,
        label: (p as any).label ?? p.title,
      }));
    case "dashboard":
      return (defaultDashboardPanels ?? []).map((p) => ({
        ...p,
        label: (p as any).label ?? p.title,
      }));
    case "global":
      return [];
    default:
      return sharedPanelMeta.map((meta) => ({
        ...meta,
        label: meta.label ?? meta.id,
        component: () => null,
      }));
  }
}
