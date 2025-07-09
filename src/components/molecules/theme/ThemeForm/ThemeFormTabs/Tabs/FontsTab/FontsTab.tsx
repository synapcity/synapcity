"use client";
import { FontField } from "@/components/molecules/theme/font/FontFamily/FontField";

export function FontsTab() {
  return (
    <div className="grid gap-4">
      <FontField name="fontFamilyHeading" label="Heading" />
      <FontField name="fontFamilyBody" label="Body" />
    </div>
  );
}
