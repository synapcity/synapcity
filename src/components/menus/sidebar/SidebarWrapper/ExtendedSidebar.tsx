"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
} from "@/components/atoms/ui/sidebar"
import { ContextSelector } from "./ContextSelector"
import { PanelModule } from "@/types/panels";
import { useState } from "react";
import { IconButton } from "@/components/atoms";

interface ExtendedSidebarProps {
  items: PanelModule[];
  activeItem: PanelModule;
  setActiveItem: (item?: PanelModule) => void;
  children: React.ReactNode;
}

export const ExtendedSidebar = ({ children, items, activeItem, setActiveItem }: ExtendedSidebarProps) => {
  const [showSearch, setShowSearch] = useState(false)
  const toggleSearch = () => setShowSearch(prev => !prev)
  return (
    <Sidebar auto collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader className="gap-3.5 p-2">
        <div className="flex item-center gap-2 justify-center h-full">
          <ContextSelector
            items={items}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <IconButton
            icon="Search"
            size="sm"
            onClick={() => toggleSearch()}
          />
        </div>
        {showSearch && <SidebarInput placeholder="Type to search..." />}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>{children}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
