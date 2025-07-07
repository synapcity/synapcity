"use client"

import { ScopedThemePopover } from "./ScopedThemePopover"
import TestWidgetLayout from "./TestWidgetLayout"

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