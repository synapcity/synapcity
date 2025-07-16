import { PanelModule } from "@/types/panels";
import { OverviewSidebar } from "./modules/overview/OverviewSidebar";
import { OverviewPanel } from "./modules/overview/OverviewPanel";
import { InboxPanel, InboxSidebar } from "./modules";

export const USER_PANEL_MODULES: PanelModule[] = [
	{
		id: "overview",
		type: "overview",
		label: "Overview",
		icon: "Activity",
		description: "Your daily snapshot and focus",
		component: () => <OverviewPanel />,
		sidebar: () => <OverviewSidebar />,
		layout: {
			isPinned: true,
		},
	},
	{
		id: "inbox",
		type: "inbox",
		label: "Inbox",
		icon: "Inbox",
		description: "Capture anything quickly",
		component: () => <InboxPanel />,
		sidebar: () => <InboxSidebar />,
		layout: {
			isFavorite: true,
		},
	},
	{
		id: "schedule",
		type: "schedule",
		label: "Schedule",
		icon: "CalendarClock",
		description: "Today’s events across hubs",
		component: () => null,
		sidebar: () => null,
		layout: {
			isFavorite: true,
		},
	},
	{
		id: "journal",
		type: "journal",
		label: "Journal",
		icon: "PenLine",
		description: "Reflect, reset, or plan your day",
		component: () => null,
		sidebar: () => null,
	},
	{
		id: "goals",
		type: "goals",
		label: "Goals",
		icon: "Target",
		description: "Track progress and habits",
		component: () => null,
		sidebar: () => null,
	},
	{
		id: "widgets",
		type: "widgets",
		label: "Pinned Widgets",
		icon: "LayoutDashboard",
		description: "Customize your panel",
		component: () => null,
		sidebar: () => null,
	},
	{
		id: "bookmarks",
		type: "bookmarks",
		label: "Bookmarks",
		icon: "Bookmark",
		description: "Scroll through your pinned notes",
		component: () => null,
		sidebar: () => null,
	},
	{
		id: "drafts",
		type: "drafts",
		label: "Drafts",
		icon: "FileText",
		description: "Unsorted or in-progress content",
		component: () => null,
		sidebar: () => null,
	},
];
