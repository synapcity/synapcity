import { ResizeHandleAxis } from "@/types";

export const defaultGridItem = {
  w: 3,
  h: 3,
  minW: 2,
  maxW: 8,
  minH: 2,
  maxH: 8,
  isDraggable: true,
  isResizable: true,
} as const;

export const breakpoints = {
  xl: 1500,
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
  xxs: 320,
};

export const cols = {
  xl: 16,
  lg: 12,
  md: 10,
  sm: 8,
  xs: 6,
  xxs: 4,
} as const;


export const gridConstants = {
  cols,
  breakpoints,
  rowHeight: 40,
  margin: [10, 20] as [number, number],
  containerPadding: [10, 30] as [number, number],
  isDraggable: true,
  isResizable: true,
  resizeHandles: ["sw", "ne"] as ResizeHandleAxis[],
  draggableHandle: ".drag-handle",
  draggableCancel: ".interactive:not(.drag-handle)",
  isDroppable: true,
};

export const baseClassName = "p-4 grid place-items-center flex-1 size-full rounded-xl shadow-md transition-all duration-200 ease-in-out";
