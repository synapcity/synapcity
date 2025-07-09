"use client";

import { ColorField } from "@/components/molecules/theme/ThemeForm";

export function ColorsTab() {
  return (
    <div className="grid gap-4">
      <ColorField name="primary" label="Primary" />
      <ColorField name="accent" label="Accent" />
    </div>
  );
}
