"use client"

import { Grid } from "@/grid";
import { useDashboardStore } from "@/stores";
import { useRef } from "react";
import { useShallow } from "zustand/shallow";
import { EditableText } from "../molecules/EditableText";

export default function DashboardPage({ dashboardId }: { dashboardId: string; }) {
  const dashboardRef = useRef<HTMLDivElement | null>(null)
  const dashboard = useDashboardStore(useShallow(s => s.getResourceById(dashboardId)))
  const updateName = useDashboardStore(useShallow(s => s.updateName))
  return (
    <div ref={dashboardRef} className="flex flex-col items-center justify-items-center flex-1">
      <div className="flex w-full">
        <EditableText
          as="h4"
          value={dashboard?.name ?? ""}
          onSave={(value: string) => updateName(dashboardId, value)}
          className="mx-auto"
        />
      </div>
      <Grid containerRef={dashboardRef} />
    </div>
  )
}
