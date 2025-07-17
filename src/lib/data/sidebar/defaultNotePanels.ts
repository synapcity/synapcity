import { lazy } from "react";
import { sharedPanelMeta } from "./sharedPanelMeta";
import type { SidebarPanel } from "@/types/sidebar";

export const defaultNotePanels: SidebarPanel[] = sharedPanelMeta.map(
	(meta) => ({
		...meta,
		component: lazy(() =>
			import(
				/* webpackChunkName: "NotesSidebarPanel-[request]" */
				`@/components/menus/sidebar/NotesSidebar/panels/${capitalize(
					meta.id
				)}Panel`
			).then((mod) => ({ default: mod.default }))
		),
		props: meta.id === "theme" ? { scope: "note" } : undefined,
	})
);

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
