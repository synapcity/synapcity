import type { NavLinkData } from "@/components/menus/navigation/Links/NavLinkGroup";
import { useUserStore, useThemeStore } from "@/stores";
import { ThemeSheet } from "@/components/theme";
import { DarkModeSwitch } from "@/components/atoms/DarkModeSwitch";

export interface DropdownLinkData {
  label: string;
  icon: string;
  render?: () => React.ReactNode;
  onClick?: () => void;
  group: string;
  destructive?: boolean;
}

export const mainNavItems: NavLinkData[] = [
  {
    id: "home",
    href: "/",
    label: "Home",
    icon: "home",
    tooltip: "Home",
    variant: {
      active: "primary",
      inactive: "ghost",
    },
  },
  {
    id: "dashboard",
    href: "/home/dashboards",
    label: "Dashboard",
    icon: "layoutDashboard",
    tooltip: "Dashboard",
    variant: {
      active: "primary",
      inactive: "ghost",
    },
  },
  {
    id: "notes",
    href: "/home/notes",
    label: "Notes",
    icon: "stickyNote",
    tooltip: "Notes",
    variant: {
      active: "primary",
      inactive: "ghost",
    },
  },
  {
    id: "libraries",
    href: "/libraries",
    label: "Libraries",
    icon: "library",
    tooltip: "Libraries",
    variant: {
      active: "primary",
      inactive: "ghost",
    },
  },
  {
    id: "settings",
    href: "/settings",
    label: "Settings",
    icon: "settings",
    tooltip: "Settings",
    variant: {
      active: "primary",
      inactive: "ghost",
    },
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
      return "/";
    },
  },
];

export const mobileAvatarNavItems: DropdownLinkData[] = [
  {
    label: "Dark Mode",
    icon: "moon",
    render: () => (
      <DarkModeSwitch
        key={"dark-mode-switch"}
        value={useThemeStore.getState().globalPreferences.mode}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={() => (useThemeStore.getState() as any).toggleMode?.()}
      />
    ),
    group: "ui",
  },
  {
    label: "Theme & Font",
    icon: "paintbrush",
    render: () => <ThemeSheet scope="global" />,
    group: "ui",
  },
  ...avatarNavItems,
];
