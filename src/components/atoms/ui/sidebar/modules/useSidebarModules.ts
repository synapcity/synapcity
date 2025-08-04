"use client"

import { useShallow } from "zustand/shallow";
import { useSidebarModuleStore } from "../useSidebarModuleStore";

export function useSidebarModules({ sidebarId }: { sidebarId: string }) {
  const sidebarSettings = useSidebarModuleStore(useShallow(s => s.settingsById[sidebarId]))
  const sidebarModuleArr = useSidebarModuleStore(useShallow(s => s.sidebarModulesById))

  const modules = sidebarSettings.modules.map(module => {
    return sidebarModuleArr[module]
  })
const icons = modules.map((module) => ({
  label: module.label,
  icon: module.icon
}))
  return {
    modules,
    icons
  }
}