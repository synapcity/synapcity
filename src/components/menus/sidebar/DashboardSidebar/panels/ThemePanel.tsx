"use client"

import { useTheme } from "@/providers/ThemeProvider"
import { convertFormToPrefs } from "@/theme"
import dynamic from "next/dynamic"
import { ThemePreferencesFormValues } from "@/components/theme/schema"
import { useMetadata } from "@/providers"

const ThemeForm = dynamic(() => import("@/components/theme/ThemeForm/ThemeForm").then((mod) => mod.ThemeForm), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export const ThemePanel = () => {
  const { scope, id: entityId } = useMetadata()
  const { updateThemePreferences, applyThemeStyles } = useTheme()
  const handleSubmit = (data: ThemePreferencesFormValues) => {
    const finalData = convertFormToPrefs(data)
    updateThemePreferences(finalData)
    applyThemeStyles(finalData)
  }
  return (
    <div className="mt-4 flex-1 flex flex-col text-(--foreground)">
      <ThemeForm
        entityId={entityId}
        scope={scope}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
export default ThemePanel