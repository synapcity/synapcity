import { z } from "zod";
import { ResourceSchema } from "../factory";
import {
  defaultFlags,
  handles,
  resizeHandleLiterals,
  defaultResizeHandles,
} from "./defaults";


import type { Layout as RGLLayout } from "react-grid-layout";

export const breakpoints = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"] as const;
export type BreakpointType = typeof breakpoints[number];

export type LayoutItem = RGLLayout; // Always use this type for each grid item
export type Layouts = Record<BreakpointType, LayoutItem[]>;

export const defaultBreakpoints: Record<BreakpointType, number> = {
  xxs: 320, xs: 480, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1400,
};
export const defaultCols: Record<BreakpointType, number> = {
  xxs: 2, xs: 3, sm: 4, md: 8, lg: 12, xl: 14, xxl: 16,
};
export const defaultMargin: Record<BreakpointType, [number, number]> = {
  xxs: [0,0], xs: [10,10], sm: [10,10], md: [20,20], lg: [20,20], xl: [30,30], xxl: [30,30],
};
export const defaultContainerPadding: Record<BreakpointType, [number, number]> = {
  xxs: [0,0], xs: [10,10], sm: [10,10], md: [20,20], lg: [20,20], xl: [30,30], xxl: [30,30],
};

function fillDefaults<T>(
  defaults: Record<BreakpointType, T>,
  partial?: Partial<Record<BreakpointType, T>>
): Record<BreakpointType, T> {
  const result: Record<BreakpointType, T> = { ...defaults };
  if (partial) {
    for (const key of Object.keys(defaults) as BreakpointType[]) {
      if (partial[key] !== undefined) result[key] = partial[key]!;
    }
  }
  return result;
}

// --- 2. Layout schemas ---
export const LayoutItemSchema = z.object({
  w: z.number(),
  h: z.number(),
  x: z.number(),
  y: z.number(),
  i: z.string(),
  minW: z.number().optional(),
  minH: z.number().optional(),
  maxW: z.number().optional(),
  maxH: z.number().optional(),
  moved: z.boolean().optional(),
  static: z.boolean().optional(),
  isDraggable: z.boolean().optional(),
  isResizable: z.boolean().optional(),
  resizeHandles: z.array(z.enum(resizeHandleLiterals)).optional(),
  isBounded: z.boolean().optional(),
});
export const LayoutSchema = z.array(LayoutItemSchema);
export const LayoutsSchema = z.record(z.enum(breakpoints), LayoutSchema).default({
  xxs: [], xs: [], sm: [], md: [], lg: [], xl: [], xxl: [],
});


// --- 3. Config/Flags/Handles schemas ---
export const GridHandlesSchema = z.object({
  draggableCancel: z.string().optional().default(".draggable-cancel"),
  draggableHandle: z.string().optional().default(".draggable"),
  resizeHandle: z.string().optional().default(".resizable"),
});
export type GridHandles = z.infer<typeof GridHandlesSchema>;

export const GridFlagsSchema = z.object({
  isDraggable: z.boolean().optional(),
  isResizable: z.boolean().optional(),
  isBounded: z.boolean().optional(),
  useCSSTransforms: z.boolean().default(true),
  allowOverlap: z.boolean().default(true),
  preventCollision: z.boolean().default(true),
  isDroppable: z.boolean().default(false),
});
export type GridFlags = z.infer<typeof GridFlagsSchema>;

export const GridConfigSchema = z.object({
  label: z.string().optional().default("Untitled"),
  breakpoints: z.record(z.enum(breakpoints), z.number()).default({...defaultBreakpoints}),
  cols: z.record(z.enum(breakpoints), z.number()).default({...defaultCols}),
  margin: z.record(z.enum(breakpoints), z.tuple([z.number(), z.number()])).default({...defaultMargin}),
  containerPadding: z.record(z.enum(breakpoints), z.tuple([z.number(), z.number()])).default({ ...defaultContainerPadding}),
  rowHeight: z.number().default(30),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compactType: z.enum(["vertical", "horizontal", null as any]).default("vertical"),
  resizeHandles: z.array(z.enum(resizeHandleLiterals)).default(defaultResizeHandles),
  autoSize: z.boolean().optional().default(true),
  flags: GridFlagsSchema,
  handles: GridHandlesSchema.default({...handles}),
});
export type GridConfig = z.infer<typeof GridConfigSchema>;

// --- 4. State schema ---
export const GridStateSchema = z.object({
  gridId: z.string(),
  activeBreakpoint: z.enum(breakpoints).default("xl"),
  width: z.number().default(1300),
  layout: LayoutSchema.default([]),
  layouts: LayoutsSchema,
  columnCount: z.number().optional(),
  isInitialized: z.boolean().default(false),
});
export type GridState = z.infer<typeof GridStateSchema>;

// --- 5. Resource ---
export const GridDataSchema = z.object({
  gridId: z.string(),
  scope: z.string(),
  parentId: z.string(),
  label: z.string().optional(),
  config: GridConfigSchema,
  state: GridStateSchema,
});
export const GridResourceSchema = ResourceSchema(GridDataSchema);
export type Grid = z.infer<typeof GridResourceSchema>;

// --- 6. Factory: always fills all required fields ---
export function createGrid(partial: Partial<Grid>): Grid {
  const now = new Date().toISOString();
  const id = partial.id ?? crypto.randomUUID();
  const gridId = partial.gridId ?? id;

  const config: GridConfig = {
    ...partial.config,
    breakpoints: fillDefaults(defaultBreakpoints, partial.config?.breakpoints),
    cols: fillDefaults(defaultCols, partial.config?.cols),
    margin: fillDefaults(defaultMargin, partial.config?.margin),
    containerPadding: fillDefaults(defaultContainerPadding, partial.config?.containerPadding),
    rowHeight: partial.config?.rowHeight ?? 30,
    compactType: partial.config?.compactType ?? "vertical",
    resizeHandles: partial.config?.resizeHandles ?? [...defaultResizeHandles], // strict type
    autoSize: partial.config?.autoSize ?? true,
    flags: {
      isDraggable: partial.config?.flags?.isDraggable ?? defaultFlags.isDraggable ?? false,
      isResizable: partial.config?.flags?.isResizable ?? defaultFlags.isResizable ?? false,
      isBounded: partial.config?.flags?.isBounded ?? defaultFlags.isBounded ?? false,
      useCSSTransforms: partial.config?.flags?.useCSSTransforms ?? defaultFlags.useCSSTransforms,
      allowOverlap: partial.config?.flags?.allowOverlap ?? defaultFlags.allowOverlap,
      preventCollision: partial.config?.flags?.preventCollision ?? defaultFlags.preventCollision,
      isDroppable: partial.config?.flags?.isDroppable ?? defaultFlags.isDroppable,
    },
    handles: {
      ...handles,
      ...(partial.config?.handles ?? {...handles}),
    },
    label: partial.config?.label ?? "",
  };

  const state: GridState = {
    ...(partial.state ?? {}),
    gridId,
    isInitialized: partial.state?.isInitialized ?? true,
    activeBreakpoint: partial.state?.activeBreakpoint ?? "xl",
    width: partial.state?.width ?? 1300,
    layout: partial.state?.layout ?? [],
    // ⬇️ Ensure layouts are parsed through Zod defaults
    layouts: partial.state?.layouts ?? {
      xxs: [], xs: [], sm: [], md: [], lg: [], xl: [], xxl: [],
    },
  };


  return GridResourceSchema.parse({
    id,
    gridId,
    scope: partial.scope ?? "",
    parentId: partial.parentId ?? "",
    label: partial.label,
    config,
    state,
    createdAt: partial.createdAt ?? now,
    updatedAt: partial.updatedAt ?? now,
    deletedAt: partial.deletedAt ?? null,
  });
}
