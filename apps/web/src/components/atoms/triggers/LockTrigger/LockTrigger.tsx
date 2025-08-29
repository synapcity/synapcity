"use client";

import { UIToggle as Toggle } from "@/components/atoms";
import { cn } from "@/utils";
import { ToggleSize } from "../../ui/UIToggle";
import { useUIStore } from "@/stores";
import { Lock, LockOpen } from "lucide-react";

interface LcokTriggerProps {
  className?: string;
  size?: ToggleSize;
  component?: string;
}

export const LockTrigger = ({
  component = "userPanel",
  className,
  size = "lg",
}: LcokTriggerProps) => {
  const isLocked = useUIStore((state) => state.components[component].isLocked ?? false);
  const setCompState = useUIStore((state) => state.setCompState);
  const toggleLock = () => {
    setCompState(component, "isLocked", !isLocked);
  };
  return (
    <Toggle
      className={cn(className, { "text-[var(--background)]": isLocked })}
      variant={isLocked ? "outline" : "ghost"}
      onClick={() => toggleLock?.()}
      size={size}
      pressed={isLocked}
      onPressedChange={(val) => setCompState(component, "isLocked", val)}
    >
      {isLocked ? <Lock /> : <LockOpen />}
    </Toggle>
  );
};
