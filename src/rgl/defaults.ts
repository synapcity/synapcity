import { ResizeHandleAxis } from "@/types";
import { GridConfig, GridState } from "./types";

 const flags = {
    isDraggable: true,
    isResizable: true,
    isBounded: false,
    useCSSTransforms: true,
    allowOverlap: true,
    preventCollision: true,
    isDroppable: true,
  }
  export const resizeHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"] as ResizeHandleAxis[]

export  const handles = {
    resizeHandle: "resize-handle",
    draggableCancel: "draggable-cancel",
    draggableHandle: "draggable"
  }
export const DEFAULT_GRID_CONFIG: Omit<GridConfig, "gridId" | "scope" | "parentId"> = {
  breakpoints: { xxs: 320, xs: 480, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1400 },
  cols: { xxs: 2, xs: 3, sm: 4, md: 8, lg: 12, xl: 14, xxl: 16 },
  margin: {
    xxs: [0,0], xs: [10,10], sm: [10,10], md: [20,20],
    lg: [20,20], xl: [30,30], xxl: [30,30],
  },
  containerPadding: {
    xxs: [0,0], xs: [10,10], sm: [10,10], md: [20,20],
    lg: [20,20], xl: [30,30], xxl: [30,30],
  },
  rowHeight: 30,
  compactType: "vertical",
  resizeHandles: resizeHandles as ResizeHandleAxis[],
  flags,
  handles,
};

export const DEFAULT_GRID_STATE: Omit<GridState, "gridId"> = {
  activeBreakpoint: "xl",
  width: 1300,
  layout: [],
  layouts: { xxs: [], xs: [], sm: [], md: [], lg: [], xl: [], xxl: [] },
  isInitialized: false,
};

export const defaultGridItem = {
  w: 3,
  h: 3,
  minW: 2,
  maxW: 8,
  minH: 2,
  maxH: 8,
...flags,

} as const;