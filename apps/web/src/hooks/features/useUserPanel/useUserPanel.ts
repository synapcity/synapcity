"use client";

import { useUserPanelStore } from "@/stores/userPanelStore";
import { USER_PANEL_MODULES } from "@/components/panels/userPanelModules";
import { useMemo } from "react";

export function usePanelItems() {
  const customOrder = useUserPanelStore((s) => s.customOrder);
  return useMemo(
    () => customOrder.map((id) => USER_PANEL_MODULES.find((m) => m.id === id)).filter(Boolean),
    [customOrder]
  );
}

export function useUserPanel() {
  const activeModuleId = useUserPanelStore((s) => s.activeModuleId);
  const setActiveModuleId = useUserPanelStore((s) => s.setActiveModuleId);
  const customOrder = useUserPanelStore((s) => s.customOrder);
  const setCustomOrder = useUserPanelStore((s) => s.setCustomOrder);
  const items = usePanelItems();
  const activeModule = items.find((mod) => mod?.id === activeModuleId);

  return {
    modules: items,
    activeModule,
    activeModuleId,
    setActiveModuleId,
    customOrder,
    setCustomOrder,
  };
}
