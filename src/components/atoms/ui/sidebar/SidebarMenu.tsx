"use client";

import { cn } from "@/utils";
import * as React from "react";

export function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("min-w-0 flex flex-col gap-1", className)}
      {...props}
    />
  );
}

export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("relative flex flex-1 group/menu-item data-[active=true]:bg-(--sidebar-accent) data-[active=true]:text-(--accent-foreground) text-(--sidebar-foreground)", className)}
      {...props}
    />
  );
}
