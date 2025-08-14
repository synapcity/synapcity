import type { NavLinkData } from "../navigation/Links/NavLinkGroup";
import { useUserStore } from "@/stores";
import { ThemeSheet } from "@/components/theme";
import { DarkModeSwitch } from "@/components/atoms/DarkModeSwitch";

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
      router.push("/home");
    },
  },
];

export interface DropdownLinkData {
  label: string;
  icon: string;
  render?: () => React.ComponentProps<unknown>;
  onClick?: () => void;
  group: string;
}

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
      router.push("/");
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
        onChange={() => useThemeStore.getState().toggleMode()}
      />
    ),
    group: "ui",
  },
  {
    label: "Theme & Font",
    icon: "paintbrush",
    render: () => <ThemeSheet />,
    theme: "ui",
  },
  ...avatarNavItems,
];
