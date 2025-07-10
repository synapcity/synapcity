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
  const componentState = useComponentUIState("user-panel")
  const toggleState = useUIStore(state => state.toggleCompState)
  const isLocked = componentState.isLocked
  const toggleLock = () => toggleState("user-panel", "isLocked")
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
