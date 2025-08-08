/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RefObject, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { handleBreakpointChange, handleLayoutChange } from "./gridHandlers";
import { useGridStore } from "@/stores";
import debounce from "lodash.debounce";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useCurrentGrid } from "@/stores/resources/gridStore/useGrid";
import { BreakpointType, LayoutItem, Layouts } from "@/stores/resources/gridStore/grid-schema";
import { normalizeLayouts } from "@/utils";
// import { useShallow } from "zustand/shallow";

// Correct usage here:
const ResponsiveGrid = WidthProvider(Responsive);

export const ReactGridLayout = ({ layoutRef }: { layoutRef: RefObject<LayoutItem[]> }) => {
  const { setState, state, config } = useCurrentGrid()
  const hasHydrated = useGridStore((state) => state.hasHydrated);
  const currentBreakpoint = state?.activeBreakpoint ?? "lg";

  const debouncedSetLayout = useMemo(() => {
    return debounce((bp: BreakpointType, layout: LayoutItem[]) => {
      const layouts: Layouts = normalizeLayouts({ ...state?.layouts, [bp]: layout })
      setState({ layouts: { ...layouts } })
    }, 500);
  }, [setState, state?.layouts]);

  if (!hasHydrated) return null;


  const safeLayouts = normalizeLayouts(state?.layouts ?? {
    xxs: [],
    xs: [],
    sm: [],
    md: [],
    lg: [],
    xl: [],
    xxl: []
  });

  return (
    <ResponsiveGrid
      key={currentBreakpoint}
      data-testid="react-grid-layout"
      className="layout flex-1 overflow-y-auto no-scrollbar shadow-inner bg-[var(--background)] text-[var(--foreground)] h-full"
      layouts={safeLayouts}
      resizeHandles={config?.resizeHandles as any}
      onLayoutChange={(layout, allLayouts) => {
        handleLayoutChange(layoutRef, debouncedSetLayout, currentBreakpoint, allLayouts[currentBreakpoint] || layout);
        console.log("layout", layout, "all", allLayouts)
      }}
      onBreakpointChange={(bp: BreakpointType) => {
        handleBreakpointChange(
          layoutRef,
          safeLayouts,
          bp,
          (breakpoint: BreakpointType) => setState({ activeBreakpoint: breakpoint })
        );
      }}

      useCSSTransforms={hasHydrated}
      {...config}
      isDraggable={true}
      isResizable={true}
      isDroppable={true}
    >
      {state?.layout.map((item) => (
        <div key={item.i} data-grid={{ ...item }} className="size-full">
          {/* <GridItem widget={widget} /> */}
        </div>
      ))}
    </ResponsiveGrid>
  );
};
