"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import { NavLink, ToggleOrButtonVariant } from "../NavLink";

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
  activeClassName = "ring ring-accent font-semibold",
}: NavLinkGroupProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col gap-2" : "flex-row gap-4",
        className
      )}
    >
      {items.map((item) => {
        const actions = item.href ? { href: item.href } : { onClick: item.onClick };
        return (
          <NavLink
            key={item.id}
            {...item}
            {...actions}
            variant={item.variant as ToggleOrButtonVariant}
            isActive={pathname === item.href}
            activeClassName={cn("hover:text-(--background)", activeClassName)}
            className="text-(--background) active:text-(--foreground) hover:text-(--foreground)"
          />
        );
      })}
    </div>
  );
}
