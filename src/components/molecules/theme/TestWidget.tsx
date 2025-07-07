"use client"

import dynamic from "next/dynamic"

const ScopedThemePopover = dynamic(() => import("@/components/molecules/theme/ScopedThemePopover/ScopedThemePopover").then((mod) => mod.ScopedThemePopover))
const TestWidgetLayout = dynamic(() => import("@/components/molecules/theme/TestWidgetLayout").then((mod) => mod.default))

export const TestWidget = () => {
  return (
    <div className="size-96 border p-2">
      <TestWidgetLayout>
        <div className="size-full">
          <ScopedThemePopover scope="widget" entityId="widget-1" />
          <h1>This is a widget</h1>
          <p>This is widget content</p>
        </div>
      </TestWidgetLayout>
    </div>
  )
}