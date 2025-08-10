"use client";

import { Toggle } from "@/components/atoms/Toggle";
import { cn } from "@/utils";
import { useUIStore } from "@/stores";

interface InboxTriggerProps {
  label?: string;
  className?: string;
}

export const InboxTrigger = ({ label = "Panel", className }: InboxTriggerProps) => {
  const setCompState = useUIStore((s) => s.setCompState);
  const isOpen = useUIStore((s) => s.components.userPanel?.isVisible ?? false);

  const setOpen = useUIStore((state) => state.setCompState);

  const toggleOpen = () => {
    setOpen("userPanel", "isVisible", !isOpen);
  };

  return (
    <Toggle
      icon="inbox"
      isIconOnly
      showIcons={false}
      className={cn("bg-transparent text-(--background)", className, {
        "text-(--background) bg-transparent data-[state=on]:bg-(--accent)": isOpen,
      })}
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
