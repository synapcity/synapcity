export const resizeHandleLiterals = ["s", "w", "e", "n", "sw", "nw", "se", "ne"] as const;
export type ResizeHandle = (typeof resizeHandleLiterals)[number];
export const defaultResizeHandles: ResizeHandle[] = [...resizeHandleLiterals]; // mutable array, strict type

// --- 2. Other defaults ---
export const defaultFlags = {
  isDraggable: true,
  isResizable: true,
  isBounded: false,
  useCSSTransforms: true,
  allowOverlap: true,
  preventCollision: true,
  isDroppable: true,
};

export const handles = {
  resizeHandle: "resize-handle",
  draggableCancel: "draggable-cancel",
  draggableHandle: "draggable",
};
