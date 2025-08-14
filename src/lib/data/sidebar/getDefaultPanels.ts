/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultNotePanels } from "./defaultNotePanels";
import { defaultDashboardPanels } from "./defaultDashboardPanels";
import type { SidebarPanel, SidebarScope } from "@/stores/ui/sidebarStore";

export function getDefaultPanels(scope: SidebarScope): SidebarPanel[] {
  switch (scope) {
    case "note":
      return (defaultNotePanels ?? []).map((p) => ({
        ...p,
        label: (p as any).label,
      }));
    case "dashboard":
      return (defaultDashboardPanels ?? []).map((p) => ({
        ...p,
        label: (p as any).label,
      }));
    case "global":
      return [];
    default:
      return [];
  }
}
