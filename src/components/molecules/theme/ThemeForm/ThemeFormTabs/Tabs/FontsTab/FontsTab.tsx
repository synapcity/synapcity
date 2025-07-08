"use client";
import { FontField } from "@/components/molecules/theme/font/FontFamily/FontField";

export function FontsTab() {
  return (
    <div className="grid gap-4">
      <FontField name="fontFamilyHeading" label="Heading Font" />
      <FontField name="fontFamilyBody" label="Body Font" />
    </div>
  );
}
