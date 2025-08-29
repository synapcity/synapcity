"use client";

import { Label } from "@/components";
import { ThemeMode } from "@/theme/types";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/ui/radio-group";

export const DarkModeRadioGroup = ({
  value,
  onChange,
}: {
  value: ThemeMode;
  onChange: (value: ThemeMode) => void;
}) => {
  return (
    <div className="space-y-2">
      <Label className="block text-sm font-medium">Mode</Label>
      <RadioGroup value={value} onValueChange={onChange} className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="light" id="mode-light" />
          <Label htmlFor="mode-light">Light</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="dark" id="mode-dark" />
          <Label htmlFor="mode-dark">Dark</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
