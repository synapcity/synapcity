"use client";

import { BaseToggle } from "../BaseToggle";
import { useUIStore } from "@/stores/ui/uiStore";
import { Eye, EyeClosed } from "lucide-react";
import { useShallow } from "zustand/shallow";

export const VisibilityToggle = () => {
  const isOpen = useUIStore(useShallow((s) => s.isSiteFocus));
  const toggleSiteFocus = useUIStore((s) => s.toggleSiteFocus);
  const toggleOpen = () => {
    toggleSiteFocus();
  };
  return (
    <BaseToggle
      pressed={!isOpen}
      onChange={() => toggleOpen()}
      activeLabel="Hide header"
      inactiveLabel="Show header"
      variant="ghost"
      inactiveClasses={"text-(--background)"}
      inactiveChildren={<EyeClosed />}
    >
      <Eye />
    </BaseToggle>
  );
};
