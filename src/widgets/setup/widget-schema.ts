import { z } from "zod";
import { ResourceSchema } from "@/stores/resources/factory/base-schema";

export const ResizeHandleSchema = z.enum([
  "s",
  "w",
  "e",
  "n",
  "sw",
  "nw",
  "se",
  "ne",
]);
export type ResizeHandle = z.infer<typeof ResizeHandleSchema>;

/** Hints/guards for the grid. Not a layout; just constraints. */
export const WidgetConstraintsSchema = z
  .object({
    minW: z.number().int().positive().optional(),
    minH: z.number().int().positive().optional(),
    maxW: z.number().int().positive().optional(),
    maxH: z.number().int().positive().optional(),

    /** If set, maintain this aspect ratio on resize. */
    aspectRatio: z
      .union([
        z.number().positive(), // fixed ratio (w / h)
        z.tuple([z.number().positive(), z.number().positive()]), // [min, max] ratio
      ])
      .optional(),
    lockAspectRatio: z.boolean().default(false),

    /** Lock movement on an axis, if you want; optional. */
    lockAxis: z.enum(["x", "y"]).optional(),

    /** Preferred starting tile size (acts like a template). */
    preferredSize: z
      .object({
        w: z.number().int().positive(),
        h: z.number().int().positive(),
      })
      .optional(),

    /** Allowed resize handles for this widget. */
    resizeHandles: z.array(ResizeHandleSchema).optional(),
  })
  .default({
    lockAspectRatio: false,
  });

export type WidgetConstraints = z.infer<typeof WidgetConstraintsSchema>;

/** Options when instantiating a widget */
export type InstantiateOptions = {
  label?: string;
  props?: Record<string, unknown>;
  settings?: Record<string, unknown>;
  constraints?: Partial<WidgetConstraints>;
  widgetKey?: string;
};

/** What you persist on the widget instance. */
export const WidgetInstanceDataSchema = z.object({
  widgetKey: z.string(),
  label: z.string().min(1),
  type: z.string().min(1),
  category: z.array(z.string()).default([]),
  icon: z.string().default("Puzzle"),
  description: z.string().default(""),
  // NOTE: z.record takes (keySchema?, valueSchema). Use string keys.
  props: z.record(z.string(), z.any()).default({}),
  settings: z.record(z.string(), z.any()).default({}),
  constraints: WidgetConstraintsSchema,
});
export type WidgetInstanceData = z.infer<typeof WidgetInstanceDataSchema>;

export const WidgetResourceSchema = ResourceSchema(WidgetInstanceDataSchema);
export type Widget = z.infer<typeof WidgetResourceSchema>;

