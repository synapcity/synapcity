"use client";

import { BaseToggle } from "@/components";
import { cn } from "@/landing-page/lib/utils";
import { useUIStore } from "@/stores/ui/uiStore";
import { Inbox } from "lucide-react";
import { useShallow } from "zustand/shallow";

export const InboxToggle = ({ className }: { className?: string }) => {
  const isOpen = useUIStore(useShallow((s) => s.components["userPanel"].isVisible ?? false));

  const setOpen = useUIStore((state) => state.setCompState);

  const toggleOpen = () => {
    setOpen("userPanel", "isVisible", !isOpen);
  };

  return (
    <BaseToggle
      pressed={isOpen}
      onChange={() => toggleOpen()}
      activeLabel="Open Inbox"
      inactiveLabel="Close Inbox"
      variant="ghost"
      inactiveClasses={cn("text-(--background)")}
      className={className}
    >
      <Inbox />
    </BaseToggle>
  );
};
