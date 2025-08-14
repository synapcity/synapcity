import { lazy } from "react";
import { notePanelMeta, sharedPanelMeta } from "./sharedPanelMeta";
import { SidebarPanel } from "@/stores/ui/sidebarStore";

export const defaultNotePanels: SidebarPanel[] = notePanelMeta.map((meta) => ({
  ...meta,
  component: lazy(() =>
    import(
      /* webpackChunkName: "DashboardSidebarPanel-[request]" */
      `@/components/menus/sidebar/NotesSidebar/panels/${capitalize(meta.id)}Panel`
    ).then((mod) => ({ default: mod.default }))
  ),
  props: meta.id === "theme" ? { scope: "dashboard" } : undefined,
}));

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
