"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import RGL, { Layout, Layouts } from "react-grid-layout";
import { useGridStore } from "../../stores/resources/gridStore/useGridStore";
import { useCurrentGrid } from "../providers/useGrid";
import { BreakpointType, ResizeHandle } from "@/stores";

const Responsive = RGL.Responsive;
const WidthProvider = RGL.WidthProvider;
const RGLayout = WidthProvider(Responsive);

const dummyLayouts: Layouts = {
  xl: [
    { i: "item0", x: 0, y: 0, w: 2, h: 2 },
    { i: "item1", x: 2, y: 0, w: 2, h: 2 },
    { i: "item2", x: 4, y: 0, w: 2, h: 2 },
  ],
  lg: [
    { i: "item0", x: 0, y: 0, w: 2, h: 2 },
    { i: "item1", x: 2, y: 0, w: 2, h: 2 },
    { i: "item2", x: 4, y: 0, w: 2, h: 2 },
  ],
  md: [], sm: [], xs: [], xxs: [],
};

export function ResponsiveGridWrapper() {
  const { gridId, setState } = useCurrentGrid();

  const hasHydrated = useGridStore(s => s.hasHydrated);

  const currentBreakpoint: BreakpointType =
    useGridStore((s) => s.grids[gridId]?.state.activeBreakpoint) || "lg";
  const currentLayouts: Layouts =
    useGridStore((s) => s.grids[gridId]?.state.layouts) || dummyLayouts;
  const gridConfig = useGridStore((s) => s.grids[gridId]?.config);

  const layoutForBreakpoint: Layout[] =
    currentLayouts?.[currentBreakpoint] && currentLayouts[currentBreakpoint].length > 0
      ? currentLayouts[currentBreakpoint]
      : dummyLayouts.lg;

  // 💡 Only set dummy layouts after hydration, if layouts truly empty
  useEffect(() => {
    if (
      hasHydrated &&
      layoutForBreakpoint.length === 0 &&
      Object.values(currentLayouts).every(arr => arr.length === 0)
    ) {
      setState({
        layouts: {
          ...currentLayouts,
          [currentBreakpoint]: dummyLayouts[currentBreakpoint] || dummyLayouts.lg,
        },
      });
    }
  }, [
    hasHydrated,
    currentBreakpoint,
    layoutForBreakpoint.length,
    currentLayouts,
    setState,
  ]);

  const handleLayoutChange = useCallback(
    (layout: Layout[]) => {
      setState({
        layouts: {
          ...currentLayouts,
          [currentBreakpoint]: layout,
        },
      });
    },
    [setState, currentLayouts, currentBreakpoint]
  );

  const handleBreakpointChange = useCallback(
    (breakpoint: string, cols: number) => {
      setState({ activeBreakpoint: breakpoint as BreakpointType, columnCount: cols });
    },
    [setState]
  );

  const gridProps = useMemo(
    () => ({
      ...gridConfig,
      layouts: currentLayouts,
      rowHeight: gridConfig?.rowHeight || 30,
      onLayoutChange: handleLayoutChange,
      onBreakpointChange: handleBreakpointChange,
      className: "layout flex-1 w-full",
    }),
    [
      gridConfig,
      currentLayouts,
      handleLayoutChange,
      handleBreakpointChange,
    ]
  );

  // 👇👇 Don't render at all until hydrated, to avoid accidental overwrite!
  if (!hasHydrated) return null;

  return (
    <RGLayout {...gridProps} key={currentBreakpoint} resizeHandles={gridProps.resizeHandles as ResizeHandle[]}>
      {layoutForBreakpoint.map((item) => (
        <div key={item.i} className="border rounded bg-gray-100 p-3 shadow-sm">
          <div className="font-medium">Dummy Item <span className="text-xs text-gray-400">{item.i}</span></div>
          <div className="text-xs text-gray-500">
            x:{item.x}, y:{item.y}, w:{item.w}, h:{item.h}
          </div>
        </div>
      ))}
    </RGLayout>
  );
}
