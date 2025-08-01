import type { SidebarPanel } from "@/types/refactor/sidebar-old";

type SharedMeta = Pick<
	SidebarPanel,
	"id" | "label" | "icon" | "tooltip" | "defaultPinned" | "defaultHidden"
>;

export const sharedPanelMeta: SharedMeta[] = [
	{
		id: "info",
		label: "Info",
		icon: "info",
		tooltip: "metadata & details",
		defaultPinned: true,
	},
	{ id: "search", label: "Search", icon: "search", tooltip: "search metadata" },
	{
		id: "theme",
		label: "Font & Theme",
		icon: "palette",
		tooltip: "font & theme prefs",
	},
	{
		id: "outline",
		label: "Outline",
		icon: "listTree",
		tooltip: "document structure",
	},
	{
		id: "connections",
		label: "Connections",
		icon: "link2",
		tooltip: "linked notes & refs",
	},
	{
		id: "resources",
		label: "Resources",
		icon: "bookOpen",
		tooltip: "files & external links",
	},
	{
		id: "annotations",
		label: "Annotations",
		icon: "messageCircle",
		tooltip: "annotations & notes",
	},
	{
		id: "trash",
		label: "Trash",
		icon: "trash2",
		tooltip: "deleted tabs (restore or purge)",
		defaultHidden: true,
	},
];
