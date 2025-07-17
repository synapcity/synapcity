"use client"

import { IconButton } from "@/components/atoms";
import { SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/atoms/ui/sidebar";
import { SidebarPanel } from "@/types/sidebar";

interface SidebarIconItemProps {
  item: SidebarPanel;
  isActive: boolean;
  onOpen: () => void;
}

export const IconSidebarItem = ({ item, isActive, onOpen }: SidebarIconItemProps) => {
  const { setOpen } = useSidebar()

  return (
    <SidebarMenuItem key={item.label}>
      <SidebarMenuButton
        tooltip={{
          children: item.label,
          hidden: false,
        }}
        isActive={isActive}
        className="bg-primary/50 hover:text-accent text-white"
        asChild
      >
        <IconButton
          variant="ghost"
          size="xs"
          isIconOnly
          icon={item.icon ?? "FileText"}
          // className="hover:text-white"
          className="inline-flex justify-center items-center hover:bg-accent border border-accent/50 data-[state=open]:bg-accent/50 dark:text-white"
          onClick={() => {
            onOpen()
            if (isActive) {
              setOpen(false)
            }
            setOpen(true)
          }}
        />
      </SidebarMenuButton>

    </SidebarMenuItem>
  )
}