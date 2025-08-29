"use client";

import { useUIStore } from "@/stores";
import { ToggleSize } from "../../ui";
import { BaseToggle } from "../BaseToggle";
import { Lock, LockOpen } from "lucide-react";
import { cn } from "@/utils";

interface LockToggleProps {
  className?: string;
  size?: ToggleSize;
  component?: string;
}
export const LockToggle = ({
  component = "userPanel",
  className,
  size = "lg",
}: LockToggleProps) => {
  const isLocked = useUIStore((state) => state.components[component].isLocked ?? false);
  const setCompState = useUIStore((state) => state.setCompState);
  const toggleLock = (pressed?: boolean) => {
    setCompState(component, "isLocked", pressed ?? !isLocked);
  };
  return (
    <BaseToggle
      pressed={isLocked}
      onChange={(pressed?: boolean) => toggleLock(pressed)}
      size={size}
      inactiveChildren={<LockOpen />}
      className={cn("text-(--background)", className)}
      inactiveClasses="text-(--foreground)"
    >
      <Lock className="text-(--background)" />
    </BaseToggle>
  );
};
