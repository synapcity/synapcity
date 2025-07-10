"use client";

import { useState } from "react";
import { Toggle } from "@/components/atoms/Toggle";
import { CollapsibleTrigger } from "@/components/atoms/ui/collapsible";
import { cn } from "@/utils";

interface InboxTriggerProps {
  label?: string;
  className?: string;
}

export const InboxTrigger = ({ label = "Panel", className }: InboxTriggerProps) => {
  // const isOpen = useUIStore((state) => state.visibleComp.inbox)
  // const setIsOpen = useUIStore((state) => state.setCompVisible)
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <CollapsibleTrigger className="flex items-center justify-center" asChild>
      <Toggle
        icon="Inbox"
        isIconOnly
        showIcons={false}
        className={cn(className)}
        variant={isOpen ? "default" : "outline"}
        onClick={() => toggleOpen()}
        size="default"
      >
        {label}
      </Toggle>
    </CollapsibleTrigger>
  );
};
