"use client"

import { useTheme } from "@/providers/ThemeProvider"
import { convertFormToPrefs } from "@/theme"
import type { ThemeScope } from "@/theme/types"
import dynamic from "next/dynamic"
import { ThemePreferencesFormValues } from "@/components/theme/schema"

const ThemeForm = dynamic(() => import("@/components/theme/ThemeForm/ThemeForm").then((mod) => mod.ThemeForm), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

export const ThemePanel = ({ entityId, scope }: { entityId?: string; scope: ThemeScope; }) => {
  const { updateThemePreferences, applyThemeStyles } = useTheme()
  const handleSubmit = (data: ThemePreferencesFormValues) => {
    const finalData = convertFormToPrefs(data)
    updateThemePreferences(finalData)
    applyThemeStyles(finalData)
  }
  return (
    <div className="mt-4 flex-1 flex flex-col">
      <ThemeForm
        entityId={entityId}
        scope={scope}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
export default ThemePanel