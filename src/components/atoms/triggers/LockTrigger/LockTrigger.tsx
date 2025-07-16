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
  const setIsLocked = useUIStore((state) => state.setCompState)
  const toggleLock = () => {
    setIsLocked(component, "isLocked", !isLocked)
  }
  return (
    <Toggle
      icon={isLocked ? "lock" : "lockOpen"}
      isIconOnly
      showIcons={false}
      className={cn(className)}
      variant={isLocked ? "outline" : "default"}
      onClick={() => toggleLock?.()}
      size={size}
    >
      {label}
    </Toggle>
  );
};
