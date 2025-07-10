"use client";

import { Button, useUISidebar } from "@/components/atoms"
import { SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/atoms/ui/sidebar"
import { Command } from "lucide-react"

export const IconSidebarHeader = () => {
  const { toggleSidebar } = useUISidebar();
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
            <Button variant="ghost" className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground bg-transparent hover:bg-accent/50 dark:hover:text-white" onClick={toggleSidebar}>
              <Command className="size-4" />
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}