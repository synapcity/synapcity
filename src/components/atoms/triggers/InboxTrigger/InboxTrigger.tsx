"use client";

import { Toggle } from "@/components/atoms/Toggle";
import { cn } from "@/utils";
import { useUIStore } from "@/stores";

interface InboxTriggerProps {
  label?: string;
  className?: string;
}

export const InboxTrigger = ({ label = "Panel", className }: InboxTriggerProps) => {
  // const userPanel = useUIStore((s) => s.components.userPanel)
  const setCompState = useUIStore((s) => s.setCompState)
  const isOpen = useUIStore((s) => s.components.userPanel?.isVisible ?? false);

  // const isOpen = userPanel ? getCompState("userPanel", "isVisible") : false
  const setOpen = useUIStore((state) => state.setCompState)

  const toggleOpen = () => {
    setOpen("userPanel", "isVisible", !isOpen)
  }

  return (
    <Toggle
      icon="inbox"
      isIconOnly
      showIcons={false}
      className={cn(className, { "text-[var(--background)]": isOpen })}
      variant={isOpen ? "outline" : "ghost"}
      onClick={() => toggleOpen()}
      size="default"
      pressed={isOpen}
      onPressedChange={(val) => setCompState("userPanel", "isVisible", val)}
    >
      {label}
    </Toggle>
  );
};
