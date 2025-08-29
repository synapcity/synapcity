"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import { NavLink, ToggleOrButtonVariant } from "../NavLink";
import { useLandingNavStore } from "@/stores";
import { useShallow } from "zustand/shallow";

export interface NavLink {
  id: string;
  href: string;
  label: string;
  icon?: string;
  variant: {
    active?: string;
    inactive?: string;
  };
  className?: string;
}

export interface NavLinkData {
  id: string;
  href?: string;
  label?: string;
  icon?: string;
  tooltip?: string;
  isIconOnly?: boolean;
  isToggle?: boolean;
  variant?: {
    active?: string;
    inactive?: string;
  };
  className?: string;
  source?: "lucide" | "iconify";
  onClick?: () => void;
  sectionIndex?: number;
}

interface NavLinkGroupProps {
  items: NavLinkData[];
  direction?: "horizontal" | "vertical";
  className?: string;
  activeClassName?: string;
}
export function NavLinkGroup({
  items,
  direction = "horizontal",
  className,
  activeClassName = "text-(--accent) font-medium",
}: NavLinkGroupProps) {
  const pathname = usePathname();
  const activeSection = useLandingNavStore(useShallow((s) => s.activeSection));
  const scrollToSection = useLandingNavStore((s) => s.scrollToSection);

  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col gap-2" : "flex-row gap-4",
        className
      )}
    >
      {items.map(({ sectionIndex, ...item }) => {
        const href = item.href;
        const isLanding = typeof sectionIndex === "number";
        const onClick = isLanding ? () => scrollToSection(sectionIndex) : item.onClick;
        const isActive = isLanding
          ? activeSection === sectionIndex
          : href
            ? href === "/home"
              ? pathname === "/home"
              : pathname === href || pathname.startsWith(`${href}/`)
            : false;
        return (
          <NavLink
            key={item.id}
            {...item}
            href={href}
            onClick={onClick}
            variant={item.variant as ToggleOrButtonVariant}
            isActive={isActive}
            activeClassName={cn(activeClassName)}
            className={cn(className, item.className)}
          />
        );
      })}
    </div>
  );
}
