"use client"

import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/atoms/ui/sheet"
import { ThemeForm } from "../ThemeForm/ThemeForm"
import { IconButton } from "@/components"
import { useThemePreferences } from "@/hooks"

export const ThemeSheet = () => {
  const { preferences: prefs } = useThemePreferences("global")
  const handleSubmit = (data: any) => {
    console.log("data", data)
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton
          variant="ghost"
          icon="Palette"
          aria-label="Font & Theme"
          tooltip="Font & Theme"
        />
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] p-4">
        <SheetHeader>
          <SheetTitle className="text-3xl">Theme</SheetTitle>
        </SheetHeader>
        <div className="mt-4">

          <ThemeForm
            theme={prefs}
            onSubmit={handleSubmit}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}