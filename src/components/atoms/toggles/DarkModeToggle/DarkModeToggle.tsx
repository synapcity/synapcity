"use client";

import { useThemeStore } from "@/stores";
import { BaseToggle } from "../BaseToggle";
import { useShallow } from "zustand/shallow";
import { Sun, Moon } from "lucide-react";
import { ToggleSize } from "../../ui";
import { cn } from "@/utils";

export const DarkModeToggle = ({
  className,
  size = "default",
}: {
  className?: string;
  size?: ToggleSize;
}) => {
  const isDarkMode =
    useThemeStore(useShallow((s) => s.globalPreferences.mode ?? "dark")) === "dark";
  const toggleDarkMode = useThemeStore((s) => s.toggleGlobalMode);
  return (
    <BaseToggle
      size={size}
      className={cn(
        "text-(--background) bg-transparent border-transparent hover:border-(--accent)",
        className
      )}
      inactiveClasses="text-(--background)"
      pressed={isDarkMode}
      onChange={() => toggleDarkMode()}
      inactiveChildren={<Moon />}
      variant="outline"
    >
      <Sun className="text-(--background)" />
    </BaseToggle>
  );
};
