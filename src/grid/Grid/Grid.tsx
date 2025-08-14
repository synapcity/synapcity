"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LayoutItem } from "@/stores";
import { BreakpointToggleSkeleton, WidgetAreaSkeleton } from "@/components/skeletons";
import { useCurrentGrid } from "@/stores/resources/gridStore/useGrid";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ReactGridLayout = dynamic(
  () => import("../ReactGridLayout/ReactGridLayout").then((mod) => mod.ReactGridLayout),
  {
    ssr: false,
    loading: () => <WidgetAreaSkeleton />,
  }
) as typeof import("../ReactGridLayout/ReactGridLayout").ReactGridLayout & {
  preload?: () => void;
};

const BreakpointToggleWrapper = dynamic(
  () => import("../BreakpointToggleWrapper/BreakpointToggleWrapper").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <BreakpointToggleSkeleton />,
  }
);

const Grid = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { state } = useCurrentGrid();
  // const grid = useGridStore(useShallow(s => s.grids[gridId]))
  // const initGrid = useGridStore(s => s.initGrid)

  // useEffect(() => {
  //   if (!grid) {
  //     initGrid({ gridId })
  //   }
  // }, [grid])
  // const dashboardId = useDashboardStore(useShallow(s => s.getSelected?.("dashboard")));
  const layouts = state?.layouts ?? {
    xxs: [
      { i: "a", x: 0, y: 0, w: 2, h: 2 },
      { i: "b", x: 0, y: 2, w: 2, h: 2 },
      { i: "c", x: 0, y: 4, w: 2, h: 2 },
    ],
    xs: [
      { i: "a", x: 0, y: 0, w: 4, h: 2 },
      { i: "b", x: 0, y: 2, w: 4, h: 2 },
      { i: "c", x: 0, y: 4, w: 4, h: 2 },
    ],
    sm: [
      { i: "a", x: 0, y: 0, w: 3, h: 2 },
      { i: "b", x: 3, y: 0, w: 3, h: 2 },
      { i: "c", x: 0, y: 2, w: 6, h: 2 },
    ],
    md: [],
    lg: [],
    xl: [],
    xxl: [],
  };

  const currentBreakpoint = state?.activeBreakpoint ?? "lg";
  const layoutRef = useRef<LayoutItem[]>(layouts?.[currentBreakpoint] || []);

  useEffect(() => {
    ReactGridLayout.preload?.();
    setMounted(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-[var(--background-100)] flex-1 size-full max-size-full flex flex-col shadow-inner relative"
    >
      <BreakpointToggleWrapper containerRef={containerRef}>
        {mounted ? <ReactGridLayout layoutRef={layoutRef} /> : <WidgetAreaSkeleton />}
      </BreakpointToggleWrapper>
    </div>
  );
};

export default Grid;
