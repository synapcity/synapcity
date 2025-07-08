/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useTheme } from "@/providers/ThemeProvider"
import type { ThemeScope } from "@/theme/types"
import dynamic from "next/dynamic"

const IconButtonSkeleton = dynamic(() => import("@/components/loading/buttons/IconButtonSkeleton").then((mod) => mod.IconButtonSkeleton), {
  ssr: true
})

const Drawer = dynamic(() => import("@/components/molecules/Drawer/Drawer").then((mod) => mod.Drawer))
const ThemeForm = dynamic(() => import("@/components/molecules/theme/ThemeForm/ThemeForm").then((mod) => mod.ThemeForm), {
  ssr: false,
  loading: () => <div>Loading...</div>
})
const IconButton = dynamic(() => import("@/components/atoms/buttons/IconButton/IconButton").then((mod) => mod.IconButton), {
  ssr: true,
  loading: () => <IconButtonSkeleton />
})

export const ThemeSheet = ({ entityId, scope }: { entityId?: string; scope: ThemeScope; }) => {
  const { updateTheme } = useTheme()
  const handleSubmit = (data: any) => {
    updateTheme(data)
  }
  return (
    <Drawer
      trigger={
        <IconButton
          variant="ghost"
          icon="Palette"
          aria-label="Font & Theme"
          tooltip="Font & Theme"
        />
      }
      title="Theme"
    >
      <div className="mt-4">
        <ThemeForm
          entityId={entityId}
          scope={scope}
          onSubmit={handleSubmit}
        />
      </div>
    </Drawer>
  )
}