"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/atoms/ui/sidebar"
import { ContextSelector } from "./ContextSelector"
import { PanelModule } from "@/types/panels";
import { PropsWithChildren } from "react"
import { useUserPanel } from "@/hooks/useUserPanel/useUserPanel";


export const ExtendedSidebar = ({ children }: PropsWithChildren) => {
  const { modules, activeModule, setActiveModuleId } = useUserPanel()
  return (
    <Sidebar auto collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader className="gap-3.5 p-2">
        <div className="flex item-center gap-2 justify-center h-full">
          <ContextSelector
            items={modules as PanelModule[]}
            activeItem={activeModule}
            setActiveItemId={setActiveModuleId}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>{children}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
