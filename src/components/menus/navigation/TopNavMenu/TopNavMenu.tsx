"use client";

import { NavigationMenu, NavigationMenuList } from "@/components/atoms/ui/navigation-menu";
import dynamic from "next/dynamic";
import { Logo } from "@/components/atoms/Logo";
import { useUIStore } from "@/stores";
import { cn } from "@/utils";
import { useShallow } from "zustand/shallow";
import { ActionsContainer } from "../ActionsContainer/ActionsContainer";

const links = [
  { href: "/", label: "Home" },
  { href: "/home/dashboards", label: "Dashboards" },
  { href: "/home/notes", label: "Notes" },
  { href: "/libraries", label: "Libraries" },
  { href: "/settings", label: "Settings" },
];

const NavMenuLink = dynamic(
  () => import("@/components/menus/navigation/NavItem/NavItem").then((mod) => mod.NavMenuLink),
  { ssr: true }
);

export function TopNavMenu() {
  const isSiteFocused = useUIStore(useShallow((s) => s.isSiteFocus));
  const header = useUIStore(useShallow((s) => s.components.header));
  const getCompState = useUIStore((s) => s.getCompState);

  const isHeaderVisible = header ? getCompState("header", "isVisible") : true;
  return (
    <div
      className={cn(
        "w-full flex items-center justify-between px-4 py-2 text-[var(--foreground)] transition-opacity duration-300",
        {
          "opacity-0 -translate-y-full": !isHeaderVisible,
          "opacity-100 translate-y-0": isHeaderVisible && !isSiteFocused,
        }
      )}
    >
      <Logo size={32} variant="mark" title="SynapCity" />

      <NavigationMenu className="mx-auto w-full">
        <NavigationMenuList>
          <ul className="flex gap-4">
            {links.map((link) => (
              <NavMenuLink key={link.href} title={link.label} href={link.href} />
            ))}
          </ul>
        </NavigationMenuList>
      </NavigationMenu>

      <ActionsContainer />
    </div>
  );
}
