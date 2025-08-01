"use client";

import { Toggle } from "@/components/atoms/Toggle";
import { cn } from "@/utils";
import { ToggleSize } from "../../ui/toggle";
import { useUIStore } from "@/stores";

interface LcokTriggerProps {
  label?: string;
  className?: string;
  size?: ToggleSize;
  component?: string;
}

export const LockTrigger = ({ component = "userPanel", label = "Lock", className, size = "lg" }: LcokTriggerProps) => {
  const isLocked = useUIStore((state) => state.components[component].isLocked ?? false)
  const setCompState = useUIStore((state) => state.setCompState)
  const toggleLock = () => {
    setCompState(component, "isLocked", !isLocked)
  }
  return (
    <Toggle
      icon={isLocked ? "lock" : "lockOpen"}
      isIconOnly
      showIcons={false}
      className={cn(className, { "text-[var(--background)]": isLocked })}
      variant={isLocked ? "outline" : "ghost"}
      onClick={() => toggleLock?.()}
      size={size}
      pressed={isLocked}
      onPressedChange={(val) => setCompState(component, "isLocked", val)}
    >
      {label}
    </Toggle>
  );
};
