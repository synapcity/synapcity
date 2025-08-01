"use client";

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/atoms/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export interface MainMenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export function SidebarMainMenu({ items }: { items: MainMenuItem[] }) {
  return (
    <SidebarMenu className="shrink-0">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url} className="flex items-center gap-2 px-4 py-1">
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
