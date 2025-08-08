// "use client";

// import { RefObject, useMemo } from "react";
// import { Layout } from "react-grid-layout";
// import { handleBreakpointChange, handleLayoutChange } from "./gridHandlers";
// import { useGridStore } from "../gridStore/useGridStore";
// // import dynamic from "next/dynamic";
// import debounce from "lodash.debounce";

// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// import { useCurrentGrid } from "@/rgl/providers/useGrid";
// import { useShallow } from "zustand/shallow";
// import { BreakpointType } from "@/rgl/types";
// import RGL from "react-grid-layout";
// const Responsive = RGL.Responsive;
// const WidthProvider = RGL.WidthProvider;

// // const GridItem = dynamic(() => import("../GridItem/GridItem").then((mod) => mod.GridItem), {
// //   ssr: false,
// // });
// // const ResponsiveGrid = WidthProvider(Responsive)

// export const ReactGridLayout = ({ layoutRef }: { layoutRef: RefObject<Layout[]> }) => {
//   const ResponsiveGrid = useMemo(() => WidthProvider(Responsive), []);
//   const { gridId, setState, state, config } = useCurrentGrid()
//   const hasHydrated = useGridStore((state) => state.hasHydrated);
//   const currentBreakpoint = useGridStore(useShallow(s => s.grids[gridId].state.activeBreakpoint));

//   const debouncedSetLayout = useMemo(() => {
//     return debounce((bp: BreakpointType, layout: Layout[]) => {
//       setState({ layouts: { ...state?.layouts, [bp]: layout } })
//     }, 500);
//   }, [setState, state?.layouts]);

//   // const layoutItems = state?.layouts?.[currentBreakpoint] || [];
//   // const layoutMap = new Map(layoutItems.map(item => [item.i, item]));

//   if (!hasHydrated) return null;
//   return (
//     <>
//       <ResponsiveGrid
//         key={currentBreakpoint}
//         data-testid="react-grid-layout"
//         className="layout flex-1 overflow-y-auto no-scrollbar shadow-inner bg-[var(--background)] text-[var(--foreground)] h-full"
//         layouts={state?.layouts}
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         resizeHandles={config?.resizeHandles as any}
//         onLayoutChange={(layout, allLayouts) => {
//           handleLayoutChange(layoutRef, debouncedSetLayout, currentBreakpoint, allLayouts[currentBreakpoint] || layout);
//           console.log("layout", layout, "all", allLayouts)
//         }}
//         onBreakpointChange={(bp: BreakpointType) => {
//           const breakpoints = ["lg", "xl", "xxl", "md", "sm", "xs", "xxs"] as const;
//           const completeLayouts = breakpoints.reduce((acc, key) => {
//             acc[key] = state?.layouts?.[key] ?? [];
//             return acc;
//           }, {} as Record<"lg" | "xl" | "xxl" | "md" | "sm" | "xs" | "xxs", Layout[]>);
//           handleBreakpointChange(layoutRef, completeLayouts, bp, (breakpoint: BreakpointType) => setState({ activeBreakpoint: breakpoint }));
//         }}
//         useCSSTransforms={hasHydrated}
//         {...config}
//         isDraggable={true}
//         isResizable={true}
//         isDroppable={true}
//       >
//         {state?.layout.map((item) => {
//           return (
//             <div key={item.i} data-grid={{ ...item }} className="size-full">
//               {/* <GridItem widget={widget} /> */}
//             </div>

//           )
//         })}
//       </ResponsiveGrid>
//     </>
//   );
// };

"use client";

import { RefObject, useMemo } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { handleBreakpointChange, handleLayoutChange } from "./gridHandlers";
import { useGridStore } from "../gridStore/useGridStore";
import debounce from "lodash.debounce";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useCurrentGrid } from "@/rgl/providers/useGrid";
// import { useShallow } from "zustand/shallow";
import { BreakpointType } from "@/rgl/types";

// Correct usage here:
const ResponsiveGrid = WidthProvider(Responsive);

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
        const breakpoints = ["lg", "xl", "xxl", "md", "sm", "xs", "xxs"] as const;
        const completeLayouts = breakpoints.reduce((acc, key) => {
          acc[key] = state?.layouts?.[key] ?? [];
          return acc;
        }, {} as Record<"lg" | "xl" | "xxl" | "md" | "sm" | "xs" | "xxs", Layout[]>);
        handleBreakpointChange(layoutRef, completeLayouts, bp, (breakpoint: BreakpointType) => setState({ activeBreakpoint: breakpoint }));
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
