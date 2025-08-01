"use client"

import * as React from "react"
import { Sidebar } from "@/components/atoms/ui/sidebar"
import { IconSidebarHeader } from "./IconSidebarHeader"
import { ExtendedSidebar } from "./ExtendedSidebar"
interface SidebarWrapperProps {

  iconSidebarContent: React.ReactNode;
  children: React.ReactNode;
}

export const SidebarWrapper = ({ iconSidebarContent, children, ...props }: SidebarWrapperProps & React.ComponentProps<typeof Sidebar>) => {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    // <Sidebar ref={ref} auto collapsible="icon" className={cn("flex-1 flex overflow-hidden [&>[data-sidebar=sidebar]]:flex-row bg-[var(--accent-background)] text-[var(--accent-foreground)]")} {...props}>
    <Sidebar ref={ref} auto collapsible="icon" className="flex-1 flex overflow-hidden [&>[data-sidebar=sidebar]]:flex-row bg-background/60 backdrop-blur-md text-foreground border-r border-border"
      {...props}>
      <Sidebar collapsible="none" auto className="rounded-none flex-1 !w-[calc(var(--sidebar-width-icon)_+_1px)] border-r max-h-full h-full bg-[var(--sidebar-accent-background)] text-[var(--sidebar-accent-foreground)]" {...props}>
        <IconSidebarHeader />

        {iconSidebarContent}
      </Sidebar>
      <div className="border-r border-border/20" />
      <ExtendedSidebar>
        {children}
      </ExtendedSidebar>
    </Sidebar>
  )
}