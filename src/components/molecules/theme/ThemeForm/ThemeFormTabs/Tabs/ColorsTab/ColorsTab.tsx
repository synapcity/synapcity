"use client";

import { ColorFieldPopover } from "@/components/molecules/theme/ThemeForm";

export function ColorsTab() {
  return (
    <div className="grid gap-4">
      <ColorFieldPopover name="primary.base" label="Primary Base" />
      <ColorFieldPopover name="accent.base" label="Accent Base" />
    </div>
  );
}
