import { PanelModule } from "@/types/panels";
import { OverviewSidebar } from "./modules/overview/OverviewSidebar";
import { OverviewPanel } from "./modules/overview/OverviewPanel";
import { InboxPanel, InboxSidebar, ScheduleSidebar } from "./modules";
// import { ScheduleSidebar } from "./modules/schedule/ScheduleSidebar";
// import { ScheduleEvent } from "@/types/schedule";
// import { ScheduleEvent } from "@/stores/scheduleStore";

// const sampleEvents: ScheduleEvent[] = [
// 	{
// 		id: "1",
// 		title: "Morning Standup",
// 		start: "2025-07-18T09:30:00.000Z",
// 		end: "2025-07-18T10:00:00.000Z",
// 		tags: [{ label: "Work", value: "work", color: "#6366f1" }],
// 		resources: [],
// 		done: false,
// 	},
// 	{
// 		id: "2",
// 		title: "Focus Block: UI Kit",
// 		start: "2025-07-18T10:15:00.000Z",
// 		end: undefined,
// 		allDay: true,
// 		tags: [{ label: "Focus", value: "focus", color: "#10b981" }],
// 		resources: [],
// 		done: false,
// 		// isFocus: true,
// 	},
// 	{
// 		id: "3",
// 		title: "Lunch Break",
// 		start: "2025-07-18T17:00:00.000Z",
// 		end: "2025-07-18T18:00:00.000Z",
// 		tags: [{ label: "Break", value: "break", color: "#f59e42" }],
// 		resources: [],
// 		done: false,
// 	},
// ];

export const USER_PANEL_MODULES: PanelModule[] = [
	{
		id: "overview",
		type: "overview",
		label: "Overview",
		icon: "activity",
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
		icon: "inbox",
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
		icon: "calendarClock",
		description: "Today’s events across hubs",
		component: () => null,
		sidebar: () => <ScheduleSidebar />,
		layout: {
			isFavorite: true,
		},
	},
	{
		id: "journal",
		type: "journal",
		label: "Journal",
		icon: "penLine",
		description: "Reflect, reset, or plan your day",
		component: () => null,
		sidebar: () => null,
	},
	{
		id: "goals",
		type: "goals",
		label: "Goals",
		icon: "target",
		description: "Track progress and habits",
		component: () => null,
		sidebar: () => null,
	},
	{
		id: "widgets",
		type: "widgets",
		label: "Pinned Widgets",
		icon: "layoutDashboard",
		description: "Customize your panel",
		component: () => null,
		sidebar: () => null,
	},
	{
		id: "bookmarks",
		type: "bookmarks",
		label: "Bookmarks",
		icon: "bookmark",
		description: "Scroll through your pinned notes",
		component: () => null,
		sidebar: () => null,
	},
	{
		id: "drafts",
		type: "drafts",
		label: "Drafts",
		icon: "fileTextIcon",
		description: "Unsorted or in-progress content",
		component: () => null,
		sidebar: () => null,
	},
];
