"use client";

import * as React from "react";
import { cn } from "@/utils";
import { useSidebar } from "./SidebarProvider";

/**
 * The clickable gutter/rail area outside the collapsed sidebar.
 * Useful for click-to-expand or hover affordance.
 */
export function SidebarRail({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { setSidebarState, sidebarState, toggleSidebar } = useSidebar();
  const isCollapsed = sidebarState !== "expanded";

  const handleExpand = () => {
    if (isCollapsed) {
      setSidebarState("expanded");
    } else {
      toggleSidebar();
    }
  };

  return (
    <button
      type="button"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={handleExpand}
      data-slot="sidebar-rail"
      data-sidebar="rail"
      className={cn(
        "group/sidebar-rail",
        "absolute inset-y-0 z-20 w-3 sm:w-4",
        "transition-all ease-linear bg-transparent",
        "hover:after:bg-[var(--sidebar-border)] after:absolute after:inset-y-0 after:left-1/2 after:w-[2px]",
        "group-data-[side=left]:-right-2 group-data-[side=right]:-left-2",
        "group-data-[side=left]:hover:cursor-e-resize group-data-[side=right]:hover:cursor-w-resize",
        "[[data-state=collapsed-icon]_&]:block [[data-state=collapsed-offcanvas]_&]:block hidden",
        className
      )}
      {...props}
    />
  );
}

