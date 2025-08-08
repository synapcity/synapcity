import { Layout, Layouts } from "react-grid-layout";
import { CompactType } from "@/types";

export type BreakpointType = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type GridId = string;

export type GridHandles = {
  draggableCancel?: string;
  draggableHandle?: string;
  resizeHandle?: string;
};
export type GridFlags = {
  isDraggable?: boolean;
  isResizable?: boolean;
  isBounded?: boolean;
  useCSSTransforms?: boolean;
  allowOverlap?: boolean;
  preventCollision?: boolean;
  isDroppable?: boolean;
};

export type GridConfig = { // id of parent entity
  label?: string;        // e.g. "main", "sidebar", etc
  breakpoints: Record<BreakpointType, number>;
  cols: Record<BreakpointType, number>;
  margin: Record<BreakpointType, [number, number]>;
  containerPadding: Record<BreakpointType, [number, number]>;
  rowHeight: number;
  compactType: CompactType;
  resizeHandles: string[];
  autoSize?: boolean;
  flags: GridFlags;
  handles: GridHandles;
};

export type GridState = {
  gridId: GridId;
  activeBreakpoint: BreakpointType;
  width: number;
  layout: Layout[];
  layouts: Layouts;
  columnCount?: number;
  isInitialized: boolean;
};

export type SingleGrid = {
  config: GridConfig;
  state: GridState;
  gridId: GridId;
  scope: string;         // "dashboard", "notebook", etc
  parentId: string;     
  label?: string;
};

export type ExportedGrid = SingleGrid;

export type InitGridArgs = {
  config?: Partial<GridConfig>;
  state?: Partial<GridState>;
  scope: string;
  parentId: string;
  label?: string;
  gridId?: GridId;
};
