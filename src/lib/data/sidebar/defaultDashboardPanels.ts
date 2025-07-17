import { lazy } from "react";
import { sharedPanelMeta } from "./sharedPanelMeta";
import type { SidebarPanel } from "@/types/sidebar";

export const defaultDashboardPanels: SidebarPanel[] = sharedPanelMeta.map(
	(meta) => ({
		...meta,
		component: lazy(() =>
			import(
				/* webpackChunkName: "DashboardSidebarPanel-[request]" */
				`@/components/menus/sidebar/DashboardSidebar/panels/Dash${capitalize(
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
