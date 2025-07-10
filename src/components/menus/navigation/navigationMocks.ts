import type { NavLinkData } from "../navigation/Links/NavLinkGroup";

export const mainNavItems: NavLinkData[] = [
	{
		id: "nav-home",
		href: "/",
		label: "Home",
		icon: "Home",
		tooltip: "Home",
		isIconOnly: false,
		variant: {
			active: "default",
			inactive: "ghost",
		},
	},
	{
		id: "nav-dashboard",
		href: "/dashboard",
		label: "Dashboard",
		icon: "LayoutDashboard",
		tooltip: "Dashboard",
		isIconOnly: true,
		variant: {
			active: "default",
			inactive: "ghost",
		},
	},
	{
		id: "nav-notes",
		href: "/notes",
		label: "Notes",
		icon: "StickyNote",
		tooltip: "Notes",
		isIconOnly: true,
		variant: {
			active: "default",
			inactive: "ghost",
		},
	},
	{
		id: "nav-libraries",
		href: "/libraries",
		label: "Libraries",
		icon: "Library",
		tooltip: "Libraries",
		isIconOnly: true,
		variant: {
			active: "default",
			inactive: "ghost",
		},
	},
	{
		id: "nav-settings",
		href: "/settings",
		label: "Settings",
		icon: "Settings",
		tooltip: "Settings",
		isIconOnly: true,
		variant: {
			active: "default",
			inactive: "ghost",
		},
	},
];
