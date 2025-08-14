"use client";

import { BaseToggle } from "../BaseToggle";
import { useUIStore } from "@/stores/ui/uiStore";
import { Eye, EyeClosed } from "lucide-react";
import { useShallow } from "zustand/shallow";

export const VisibilityToggle = () => {
  const isVisible = useUIStore(useShallow((s) => s.isSiteFocus));
  const isOpen = useUIStore(useShallow((s) => s.components["header"].isVisible ?? false));
  const setOpen = useUIStore((s) => s.setCompState);
  const toggleSiteFocus = useUIStore((s) => s.toggleSiteFocus);
  const toggleOpen = () => {
    toggleSiteFocus();
    setOpen("header", "isVisible", isOpen);
  };
  return (
    <BaseToggle
      pressed={isVisible}
      onChange={() => toggleOpen()}
      activeLabel="Hide header"
      inactiveLabel="Show header"
      variant="ghost"
      inactiveClasses={"text-(--background)"}
      inactiveChildren={<Eye />}
    >
      <EyeClosed />
    </BaseToggle>
  );
};
