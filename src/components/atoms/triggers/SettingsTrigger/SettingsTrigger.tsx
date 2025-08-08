"use client";

import { Button } from "@/components/atoms/buttons";
import { useUIStore } from "@/stores/ui/uiStore";

export const SettingsTrigger = () => {
  const comps = useUIStore((state) => state.components);
  const settingsComp = comps["settings"]
  const isOpen = settingsComp.isVisible
  const setComp = useUIStore((state) => state.setComponent);
  const setIsOpen = () => setComp("settings", { isVisible: settingsComp ? !isOpen : false })

  const toggleOpen = () => {
    setIsOpen();
  };

  return (
    <Button variant={isOpen ? "primary" : "ghost"} onClick={() => toggleOpen()} isIconOnly icon="Cog" tooltip="User Settings" />
  )
}