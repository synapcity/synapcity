import { lazy } from "react";
import { dashboardPanelMeta } from "./sharedPanelMeta";
import { SidebarPanel } from "@/stores/ui/sidebarStore";

export const defaultDashboardPanels: SidebarPanel[] = dashboardPanelMeta.map(
	(meta) => ({
		...meta,
		component: lazy(() =>
			import(
				/* webpackChunkName: "DashboardSidebarPanel-[request]" */
				`@/components/menus/sidebar/DashboardSidebar/panels/${capitalize(
					meta.id
				)}Panel`
			).then((mod) => ({ default: mod.default }))
		),
		props: meta.id === "theme" ? { scope: "dashboard" } : undefined,
	})
);

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
