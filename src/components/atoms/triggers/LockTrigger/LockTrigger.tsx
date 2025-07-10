"use client";

import { Toggle } from "@/components/atoms/Toggle";
import { cn } from "@/utils";
import { ToggleSize } from "../../ui/toggle";
import { useComponentUIState, useUIStore } from "@/stores";

interface LcokTriggerProps {
  label?: string;
  className?: string;
  size?: ToggleSize
}

export const LockTrigger = ({ label = "Lock", className, size = "lg" }: LcokTriggerProps) => {
  const isLocked = useComponentUIState("user-panel").isLocked
  const setState = useUIStore(state => state.setCompState)
  const toggleLock = () => setState("user-panel", "isLocked", !isLocked)
  return (
    <Toggle
      icon={isLocked ? "Lock" : "LockOpen"}
      isIconOnly
      showIcons={false}
      className={cn(className)}
      variant={isLocked ? "default" : "outline"}
      onClick={() => toggleLock?.()}
      size={size}
    >
      {label}
    </Toggle>
  );
};
