import { ReactNode } from "react";
// import { Layouts } from "react-grid-layout";

// Resize handles (allowed axis)

// Item in layout grid
export type LayoutItem = {
  w: number;
  h: number;
  x: number;
  y: number;
  i: string;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  moved?: boolean;
  static?: boolean;
  isDraggable?: boolean | null;
  isResizable?: boolean | null;
  resizeHandles?: ResizeHandleAxis[];
  isBounded?: boolean | null;
};

// Layout is an array of items
export type Layout = ReadonlyArray<LayoutItem>;

export type Layouts = Record<BreakpointType, Layout>
// Positioning
export type Position = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type ReactDraggableCallbackData = {
  node: HTMLElement;
  x?: number;
  y?: number;
  deltaX: number;
  deltaY: number;
  lastX?: number;
  lastY?: number;
};

export type PartialPosition = { left: number; top: number };
export type DroppingPosition = { left: number; top: number; e: Event };
export type Size = { width: number; height: number };

// Events
export type GridDragEvent = {
  e: Event;
  node: HTMLElement;
  newPosition: PartialPosition;
};
export type GridResizeEvent = {
  e: Event;
  node: HTMLElement;
  size: Size;
  handle: string;
};

// Drag over event (TypeScript version, might need to adjust nativeEvent type)
export type DragOverEvent = MouseEvent & {
  nativeEvent: {
    layerX: number;
    layerY: number;
    // ...other props if needed
  } & Event;
};

// Typescript doesn't need a custom Pick type, use built-in Pick
// export type Pick<FromType, Properties> = Pick<FromType, keyof Properties>;

// ReactChildren
export type ReactChildren = ReactNode; // or React.ReactNode if you want all valid children, not just elements

// All callbacks are of the signature (layout, oldItem, newItem, placeholder, e, node).
export type EventCallback = (
  layout: Layout,
  oldItem: LayoutItem | undefined | null,
  newItem: LayoutItem | undefined | null,
  placeholder: LayoutItem | undefined | null,
  e: Event,
  node?: HTMLElement
) => void;

// Compact type
export type CompactType = "horizontal" | "vertical" | undefined | null;

export type BreakpointType = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type ResizeHandleAxis = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";
