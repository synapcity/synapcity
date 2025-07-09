"use client";

import { ColorFieldPopover } from "@/components/molecules/theme/ThemeForm";

export function ColorsTab() {
  return (
    <div className="grid gap-4">
      <ColorFieldPopover name="primary" label="Primary Base" />
      <ColorFieldPopover name="accent" label="Accent Base" />
    </div>
  );
}
