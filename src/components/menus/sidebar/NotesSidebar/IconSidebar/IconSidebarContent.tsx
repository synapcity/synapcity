"use client";

import { useRouter } from "next/navigation";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu } from "@/components/atoms/ui/sidebar";
import { IconSidebarItem } from "./IconSidebarItem";
import { usePanels } from "@/hooks/sidebar/usePanels";
import { useUIStore } from "@/stores/uiStore";
import type { SidebarScope, SidebarPanel } from "@/types/sidebar";

interface IconSidebarContentProps {
  scope: SidebarScope;
  id: string;
}

export function IconSidebarContent({ scope, id }: IconSidebarContentProps) {
  const router = useRouter();
  const { panels, activeId } = usePanels(scope, id);
  const setActivePanel = useUIStore((s) => s.setActivePanel);

  const handleClick = (panel: SidebarPanel) => {
    if (panel.onClick) {
      panel.onClick();
    } else if (panel.href) {
      if (panel.external) {
        window.open(panel.href, "_blank")
      } else {
        router.push(panel.href)
      }
    } else {
      setActivePanel(scope, id, panel.id);
    }
  };

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent className="px-1.5 md:px-0 overflow-y-auto no-scrollbar">
          <SidebarMenu>
            {panels.map((panel) => (
              <IconSidebarItem
                key={panel.id}
                item={panel}
                isActive={activeId === panel.id}
                onOpen={() => handleClick(panel)}
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
