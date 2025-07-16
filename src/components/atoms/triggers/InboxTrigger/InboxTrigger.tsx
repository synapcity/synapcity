"use client";

import { Toggle } from "@/components/atoms/Toggle";
import { cn } from "@/utils";
import { useUIStore } from "@/stores";

interface InboxTriggerProps {
  label?: string;
  className?: string;
}

export const InboxTrigger = ({ label = "Panel", className }: InboxTriggerProps) => {
  const isOpen = useUIStore((state) => state.components.userPanel.isVisible ?? false)
  const setOpen = useUIStore((state) => state.setCompState)

  const toggleOpen = () => {
    setOpen("userPanel", "isVisible", !isOpen)
  }

  return (
    <Toggle
      icon="inbox"
      isIconOnly
      showIcons={false}
      className={cn(className)}
      variant={isOpen ? "outline" : "default"}
      onClick={() => toggleOpen()}
      size="default"
    >
      {label}
    </Toggle>
  );
};
