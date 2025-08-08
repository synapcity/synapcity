"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Layout } from "react-grid-layout";
import { BreakpointToggleSkeleton, WidgetAreaSkeleton } from "@/components/skeletons";
import { useCurrentGrid } from "@/rgl/providers/useGrid";
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css";

const ReactGridLayout = dynamic(
  () =>
    import("../ReactGridLayout/ReactGridLayout").then(
      (mod) => mod.ReactGridLayout
    ),
  {
    ssr: false,
    loading: () => (
      <WidgetAreaSkeleton />
    ),
  }
) as typeof import("../ReactGridLayout/ReactGridLayout").ReactGridLayout & {
  preload?: () => void;
};

const BreakpointToggleWrapper = dynamic(
  () =>
    import("../BreakpointToggleWrapper/BreakpointToggleWrapper").then(
      (mod) => mod.default
    ),
  {
    ssr: false,
    loading: () => (
      <BreakpointToggleSkeleton />
    ),
  }
);

const Grid = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { state } = useCurrentGrid()
  // const grid = useGridStore(useShallow(s => s.grids[gridId]))
  // const initGrid = useGridStore(s => s.initGrid)

  // useEffect(() => {
  //   if (!grid) {
  //     initGrid({ gridId })
  //   }
  // }, [grid])
  // const dashboardId = useDashboardStore(useShallow(s => s.getSelected?.("dashboard")));
  const layouts = state?.layouts ?? {}

  const currentBreakpoint = state?.activeBreakpoint ?? "lg"
  const layoutRef = useRef<Layout[]>(layouts?.[currentBreakpoint] || [])

  useEffect(() => {
    ReactGridLayout.preload?.();
    setMounted(true);
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--background-100)] flex-1 size-full max-size-full flex flex-col shadow-inner relative">
      <BreakpointToggleWrapper containerRef={containerRef}>
        {mounted ? <ReactGridLayout layoutRef={layoutRef} /> : <WidgetAreaSkeleton />}
      </BreakpointToggleWrapper>
    </div>
  )
}

export default Grid;