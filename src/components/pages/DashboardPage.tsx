"use client"

import { Grid } from "@/grid";
import { useDashboardStore } from "@/stores";
import { useRef } from "react";
import { useShallow } from "zustand/shallow";

export default function DashboardPage({ dashboardId }: { dashboardId: string; }) {
  const dashboardRef = useRef<HTMLDivElement | null>(null)
  const dashboard = useDashboardStore(useShallow(s => s.getResourceById(dashboardId)))
  return (
    <div ref={dashboardRef} className="flex flex-col items-center justify-items-center flex-1">
      <h1>{dashboard?.name}</h1>
      <Grid containerRef={dashboardRef} />
    </div>
  )
}
