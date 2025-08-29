"use client";

import { ColorField } from "../Fields/ColorField/ColorField";
import { FontField } from "../../font/FontFamily/FontField/FontField";
import { FontSizeField } from "../../font/FontSize/FontSizeField/FontSizeField";
import { DarkModeField } from "./DarkMode/DarkModeField";
import { SwitchField } from "../Fields/SwitchField/SwitchField";
import { useTheme } from "@/providers/ThemeProvider";

export const ThemeFormFields = () => {
  const { isScoped } = useTheme();
  return (
    <div className="grid gap-4">
      <DarkModeField />
      <FontSizeField />
      <FontField name="fontFamilyHeading" label="Heading" className="text-(--foreground)" />
      <FontField name="fontFamilyBody" label="Body" className="text-(--foreground)" />

      <ColorField name="primary" label="Primary" />
      <ColorField name="accent" label="Accent" />
      {isScoped && <SwitchField name="inheritsFromGlobalTheme" label="Use Global Theme" />}
    </div>
  );
};
