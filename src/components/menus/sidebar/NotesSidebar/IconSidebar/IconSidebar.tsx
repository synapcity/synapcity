"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/atoms/ui/sidebar";
import { IconSidebarContent } from "./IconSidebarContent";
import type { SidebarScope } from "@/types/sidebar";

interface IIconSidebarProps {
  scope: SidebarScope;
  id: string;
  onAdd?: () => void;
}

export function IconSidebar({ scope, id }: IIconSidebarProps) {
  return (
    <Sidebar
      collapsible="none"
      variant="inset"
      className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r top-(--header-height) h-[calc(100svh-var(--header-height))]! shrink-0"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <SidebarTrigger />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <IconSidebarContent scope={scope} id={id} />
    </Sidebar>
  );
}
