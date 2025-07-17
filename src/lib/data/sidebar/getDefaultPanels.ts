import { defaultNotePanels } from "./defaultNotePanels";
import { defaultDashboardPanels } from "./defaultDashboardPanels";
import type { SidebarPanel, SidebarScope } from "@/types/sidebar";
import { sharedPanelMeta } from "./sharedPanelMeta";

export function getDefaultPanels(scope: SidebarScope): SidebarPanel[] {
	switch (scope) {
		case "note":
			return defaultNotePanels;
		case "dashboard":
			return defaultDashboardPanels;
		default:
			return sharedPanelMeta.map((meta) => ({
				...meta,
				component: () => null,
			}));
	}
}
