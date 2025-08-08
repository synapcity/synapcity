"use client";

import { RefObject, useMemo } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { handleBreakpointChange, handleLayoutChange } from "./gridHandlers";
import { useGridStore } from "@/stores";
import debounce from "lodash.debounce";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useCurrentGrid } from "@/rgl/providers/useGrid";
import { breakpoints, BreakpointType } from "@/stores/resources/gridStore/grid-schema";
// import { useShallow } from "zustand/shallow";

// Correct usage here:
const ResponsiveGrid = WidthProvider(Responsive);

function completeLayouts(
  partial: Partial<Record<BreakpointType, Layout[]>>
): Record<BreakpointType, Layout[]> {
  // If breakpoints is a const array, this is safe
  return breakpoints.reduce((acc, key) => {
    acc[key] = partial?.[key] ?? [];
    return acc;
  }, {} as Record<BreakpointType, Layout[]>);
}


export const ReactGridLayout = ({ layoutRef }: { layoutRef: RefObject<Layout[]> }) => {
  const { setState, state, config } = useCurrentGrid()
  const hasHydrated = useGridStore((state) => state.hasHydrated);
  const currentBreakpoint = state?.activeBreakpoint ?? "lg";

  const debouncedSetLayout = useMemo(() => {
    return debounce((bp: BreakpointType, layout: Layout[]) => {
      setState({ layouts: { ...state?.layouts, [bp]: layout } })
    }, 500);
  }, [setState, state?.layouts]);

  if (!hasHydrated) return null;

  return (
    <ResponsiveGrid
      key={currentBreakpoint}
      data-testid="react-grid-layout"
      className="layout flex-1 overflow-y-auto no-scrollbar shadow-inner bg-[var(--background)] text-[var(--foreground)] h-full"
      layouts={state?.layouts}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resizeHandles={config?.resizeHandles as any}
      onLayoutChange={(layout, allLayouts) => {
        handleLayoutChange(layoutRef, debouncedSetLayout, currentBreakpoint, allLayouts[currentBreakpoint] || layout);
        console.log("layout", layout, "all", allLayouts)
      }}
      onBreakpointChange={(bp: BreakpointType) => {
        handleBreakpointChange(
          layoutRef,
          completeLayouts(state?.layouts ?? {}),
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
      {state?.layout.map((item) => {
        return (
          <div key={item.i} data-grid={{ ...item }} className="size-full">
            {/* <GridItem widget={widget} /> */}
          </div>
        )
      })}
    </ResponsiveGrid>
  );
};
