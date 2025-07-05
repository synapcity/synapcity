"use client"

import { useFormContext } from "react-hook-form"
import { ColorFieldPopover } from "../Fields/ColorField/ColorField"
import { FontField } from "../../font/FontFamily/FontField/FontField"
import { FontSizeField } from "../../font/FontSize/FontSizeField/FontSizeField"
import { DarkModeField } from "./DarkMode/DarkModeField"
import { SwitchField } from "../Fields"

export const ThemeFormFields = () => {
  const { control } = useFormContext()

  return (
    <div className="grid gap-4">
      <DarkModeField />
      <FontSizeField />
      <FontField
        name="fontFamilyHeading"
        label="Heading Font"
      />
      <FontField
        name="fontFamilyBody"
        label="Body Font"
      />

      <ColorFieldPopover name="primary.base" label="Primary Base" />
      <ColorFieldPopover name="accent.base" label="Accent Base" />
      <SwitchField name="useGlobalTheme" label="Use Global Theme" />
    </div>
  )
}
