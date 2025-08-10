"use client";

import { Moon, Sun } from "lucide-react";
import { Label } from "@/components/atoms";
import { Switch } from "@/components/molecules";
import type { ThemeMode } from "@/theme/types";

export const DarkModeSwitch = ({
  value,
  onChange,
  showLabel,
}: {
  value: ThemeMode;
  onChange: (value: ThemeMode) => void;
  showLabel?: boolean;
}) => {
  const isDark = value === "dark"; // derived value based on prop

  return (
    <div className="flex items-center justify-end gap-2">
      {isDark ? <Sun className="transition-all" /> : <Moon className="transition-all" />}
      {showLabel && <Label className="text-sm font-medium">Dark Theme</Label>}
      <Switch
        checked={isDark}
        onCheckedChange={(newChecked) => onChange(newChecked ? "dark" : "light")}
      />
    </div>
  );
};
