"use client"

import { Grid } from "@/grid";
// import { useMetadata } from "@/providers"
// import { ResponsiveGridWrapper } from "@/rgl/components/ResponsiveGridWrapper"
import { useRef } from "react";

export default function DashboardPage() {
  const dashboardRef = useRef<HTMLDivElement | null>(null)
  // const { scope, id } = useMetadata()
  // const children = useMemo(() => {
  //   return new Array(20).fill(undefined).map((val, idx) => {
  //     return <div key={idx} data-grid={{ x: idx, y: 1, w: 1, h: 1 }} />;
  //   });
  // }, []);
  return (
    <div ref={dashboardRef} className="flex flex-col items-center justify-items-center flex-1">
      {/* <ResponsiveGridWrapper /> */}
      <Grid containerRef={dashboardRef} />
    </div>
  )
}
