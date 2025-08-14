"use client";

import { UIToggle as Toggle } from "@/components/atoms/ui";
import { cn } from "@/utils";
import { useUIStore } from "@/stores";
import { Inbox } from "lucide-react";

interface InboxTriggerProps {
  className?: string;
}

export const InboxTrigger = ({ className }: InboxTriggerProps) => {
  const setCompState = useUIStore((s) => s.setCompState);
  const isOpen = useUIStore((s) => s.components.userPanel?.isVisible ?? false);

  const setOpen = useUIStore((state) => state.setCompState);

  const toggleOpen = () => {
    setOpen("userPanel", "isVisible", !isOpen);
  };

  return (
    <Toggle
      className={cn("bg-transparent text-(--background)", className, {
        "text-(--background) bg-transparent data-[state=on]:bg-(--accent)": isOpen,
      })}
      variant={isOpen ? "outline" : "ghost"}
      onClick={() => toggleOpen()}
      size="default"
      pressed={isOpen}
      onPressedChange={(val) => setCompState("userPanel", "isVisible", val)}
    >
      <Inbox />
    </Toggle>
  );
};
