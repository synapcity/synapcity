import type { NavLinkData } from "@/components/menus/navigation/Links/NavLinkGroup";
import { useUserStore, useThemeStore, useUIStore } from "@/stores";

export interface DropdownItem {
  label: string;
  icon?: string;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  shortcut?: string;
  tooltip?: string;
}

type DropdownGroup = "separator" | { label: string; items: DropdownItem[] } | DropdownItem;

export interface DropdownLinkData {
  label: string;
  icon: string;
  onClick?: () => void;
  group: string;
  destructive?: boolean;
}

export const mainNavItems: NavLinkData[] = [
  {
    id: "home",
    href: "/home",
    label: "Home",
    icon: "home",
    variant: { active: "outline", inactive: "ghost" },
  },
  {
    id: "dashboard",
    href: "/home/dashboards",
    label: "Dashboard",
    icon: "layoutDashboard",
    variant: { active: "outline", inactive: "ghost" },
  },
  {
    id: "notes",
    href: "/home/notes",
    label: "Notes",
    icon: "stickyNote",
    variant: { active: "outline", inactive: "ghost" },
  },
  {
    id: "libraries",
    href: "/libraries",
    label: "Libraries",
    icon: "library",
    variant: { active: "outline", inactive: "ghost" },
  },
  {
    id: "settings",
    href: "/settings",
    label: "Settings",
    icon: "settings",
    variant: { active: "outline", inactive: "ghost" },
  },
];

export const landingNavItems: NavLinkData[] = [
  { id: "home", href: "#home", label: "Home" },
  { id: "features", href: "#features", label: "Features" },
  { id: "how-it-works", href: "#how-it-works", label: "How It Works" },
  { id: "widgets", href: "#widgets", label: "Widgets" },
  {
    id: "signup",
    href: "/signup",
    label: "Sign Up",
    variant: { active: "primary", inactive: "outline" },
  },
  {
    id: "demo",
    href: "/home",
    label: "Demo",
    variant: { active: "link", inactive: "link" },
    onClick: () => {
      useUserStore.getState().loginDemo();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).history.replaceState(null, "", "/home");
    },
  },
];

export const avatarNavItems: DropdownLinkData[] = [
  {
    label: "Profile",
    icon: "user",
    onClick: () => console.log("editing profile"),
    group: "user",
  },
  {
    label: "Settings",
    icon: "settings",
    onClick: () => console.log("editing settings"),
    group: "user",
  },
  {
    label: "Log Out",
    icon: "logOut",
    destructive: true,
    group: "auth",
    onClick: () => {
      useUserStore.getState().logout();
      window.history.replaceState(null, "", "/");
    },
  },
];

/**
 * The mobile menu originally used inline components (render) in-menu.
 * Convert those to actions. If you have a real "open theme sheet" action,
 * replace the console.log below with that call.
 */
const mobileUiActions: DropdownLinkData[] = [
  {
    label: "Dark Mode",
    icon: "moon",
    onClick: () => {
      useThemeStore.getState().toggleGlobalMode();
    },
    group: "ui",
  },
  {
    label: "Theme & Font",
    icon: "palette",
    onClick: () => {
      useUIStore.getState().setCompState("globalTheme", "isVisible", true);
    },
    group: "ui",
  },
];

export const mobileAvatarNavItems: DropdownLinkData[] = [...mobileUiActions, ...avatarNavItems];

/* ------------------------------ GROUPING LOGIC ----------------------------- */

const titleizeGroup = (key: string) =>
  key === key.toUpperCase() ? key : key.charAt(0).toUpperCase() + key.slice(1);

const linkToItem = (link: DropdownLinkData): DropdownItem => ({
  label: link.label,
  icon: link.icon,
  destructive: link.destructive,
  onSelect: link.onClick ? () => void link.onClick?.() : undefined,
});

const groupLinks = (links: DropdownLinkData[]): DropdownGroup[] => {
  const map = new Map<string, DropdownItem[]>();
  for (const link of links) {
    const list = map.get(link.group) ?? [];
    list.push(linkToItem(link));
    map.set(link.group, list);
  }
  return Array.from(map.entries()).map(([group, items]) => ({
    label: titleizeGroup(group),
    items,
  }));
};

/* ----------------------------- FINAL GROUPED API ---------------------------- */

/** Desktop avatar menu (grouped by "user", "auth", etc.) */
export const avatarMenu: DropdownGroup[] = groupLinks(avatarNavItems);

/**
 * Mobile avatar menu:
 *  - "UI" group first (Dark Mode, Theme & Font)
 *  - separator
 *  - then the grouped user/auth items
 */
export const mobileAvatarMenu: DropdownGroup[] = [
  { label: "UI", items: mobileUiActions.map(linkToItem) },
  "separator",
  ...groupLinks(avatarNavItems),
];

/* ------------------------------- HOW TO USE --------------------------------
In your AvatarDropdown (which wraps <Dropdown />), accept an `items` prop of
type `DropdownGroup[]` and pass it through:

<AvatarDropdown items={avatarMenu} ... />
or
<AvatarDropdown items={mobileAvatarMenu} ... />

The `Dropdown` you already have expects `items: DropdownGroup[]`, so this file
is now ready to plug in.
---------------------------------------------------------------------------- */
