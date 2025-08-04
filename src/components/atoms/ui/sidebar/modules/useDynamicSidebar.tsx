"use client";

import { useSidebarModuleStore } from "../useSidebarModuleStore";
import { SIDEBAR_MODULES } from "./sidebarModules";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "../SidebarGroup";
import { useShallow } from "zustand/shallow";

export function useDynamicSidebar({ sidebarId }: { sidebarId: string }) {
  const settings = useSidebarModuleStore(useShallow((s) => s.getSettings(sidebarId)));
  const pinnedModules = SIDEBAR_MODULES.filter(useShallow((mod) => !!mod.pinned));
  const unpinnedModules = SIDEBAR_MODULES.filter(useShallow(mod => !mod.pinned));
  const visibleModules = [...pinnedModules, ...unpinnedModules]
  return !settings.isHidden && (
    <>
      {visibleModules.map((mod) => (
        <SidebarGroup key={mod.id}>
          <SidebarGroupLabel>{mod.label}</SidebarGroupLabel>
          <SidebarGroupContent>{mod.component}</SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
