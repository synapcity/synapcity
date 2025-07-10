"use client"

import * as React from "react"
import { Sidebar, SidebarFooter } from "@/components/atoms/ui/sidebar"
import { IconSidebarHeader } from "./IconSidebarHeader"
import { AvatarDropdown } from "@/components/menus/dropdown/AvatarDropdown"
import { ExtendedSidebar } from "./ExtendedSidebar"
import { cn } from "@/utils"
import { useUserStore } from "@/stores"

interface SidebarWrapperProps {

  iconSidebarContent: React.ReactNode;
  children: React.ReactNode;
}

export const SidebarWrapper = ({ iconSidebarContent, children, ...props }: SidebarWrapperProps & React.ComponentProps<typeof Sidebar>) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const user = useUserStore(state => state.user)
  const logout = useUserStore(state => state.logout)

  return (
    <Sidebar ref={ref} auto collapsible="icon" className={cn("flex-1 flex overflow-hidden [&>[data-sidebar=sidebar]]:flex-row bg-[var(--sidebar-background")} {...props}>
      <Sidebar collapsible="none" auto className="rounded-none flex-1 !w-[calc(var(--sidebar-width-icon)_+_1px)] border-r max-h-full h-full bg-[var(--sidebar-background)]" {...props}>
        <IconSidebarHeader />
        {iconSidebarContent}
        <SidebarFooter>
          <AvatarDropdown
            avatarUrl={user?.avatar ?? ""}
            username={user?.username ?? ""}
            fallbackIcon="User"
            onEdit={() => console.log("Edit profile")}
            onLogout={logout}
          />
        </SidebarFooter>
      </Sidebar>
      <ExtendedSidebar>
        {children}
      </ExtendedSidebar>
    </Sidebar>
  )
}