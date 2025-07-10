"use client";

import { USER_PANEL_MODULES } from "../../userPanelModules";
import { useUserPanelStore } from "@/stores/userPanelStore";
import { PanelModule } from "@/types/panels";
import { IconSidebarContent } from "@/components/menus/sidebar/SidebarWrapper/IconSidebarContent";

export const UserPanelIconSidebarContent = () => {
  const activeItem = useUserPanelStore((s) => s.activeSection);
  const setActiveItem = useUserPanelStore((s) => s.setActiveSection);
  const customOrder = useUserPanelStore((s) => s.customOrder);
  const setCustomOrder = useUserPanelStore((s) => s.setCustomOrder);

  const items = customOrder
    .map((id) => USER_PANEL_MODULES.find((m) => m.id === id))
    .filter((item): item is PanelModule => !!item);

  return (
    <IconSidebarContent
      items={items}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
      setCustomOrder={setCustomOrder}
    />
  );
};
