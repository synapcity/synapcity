"use client";

import { Palette } from "lucide-react";
import { BaseToggle } from "../BaseToggle";
import { ThemeSheet } from "@/components/theme";
import { useUIStore } from "@/stores";
import { useShallow } from "zustand/shallow";

export const ThemeToggle = () => {
  const isOpen = useUIStore(useShallow((s) => s.components["globalTheme"].isVisible ?? false));
  const setOpen = useUIStore((s) => s.setCompState);
  const toggleOpen = (open?: boolean) => {
    setOpen("globalTheme", "isVisible", open ?? !isOpen);
  };
  return (
    <ThemeSheet
      scope="global"
      open={isOpen}
      onOpenChange={toggleOpen}
      trigger={
        <BaseToggle inactiveLabel="Open Theme" className="text-(--background)">
          <Palette />
        </BaseToggle>
      }
    />
  );
};
