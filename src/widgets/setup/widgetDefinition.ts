// src/registry/widgetDefinition.ts
import type React from "react";
import { z } from "zod";
import type { WidgetComponentProps, WidgetModule } from "./types";

export type WidgetDefinition<
  PSchema extends z.ZodTypeAny = z.ZodAny,
  SSchema extends z.ZodTypeAny = z.ZodAny,
> = {
  id: string; // unique
  widgetKey: string; // registry key
  type: string;
  category: string[];
  name: string;
  icon: string;
  description?: string;
  version: number;
  tags?: string[];

  // Strong types for instance data
  propsSchema: PSchema;
  settingsSchema: SSchema;
  defaultProps: z.infer<PSchema>;
  defaultSettings: z.infer<SSchema>;

  // === Component hook-up (one of the two) ===

  // 1) Eager (core widgets)
  component?: React.ComponentType<WidgetComponentProps<z.infer<PSchema>, z.infer<SSchema>>>;

  // 2) Lazy (recommended)
  getComponent?: () => Promise<WidgetModule<z.infer<PSchema>, z.infer<SSchema>>>;

  // Optional hints for grid
  constraints?: {
    minW?: number;
    minH?: number;
    maxW?: number;
    maxH?: number;
    aspectRatio?: number | [number, number];
    lockAspectRatio?: boolean;
    preferredSize?: { w: number; h: number };
    resizeHandles?: Array<"s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne">;
  };

  layoutTemplate?: { w: number; h: number; x?: number; y?: number };
};

export function defineWidget<PSchema extends z.ZodTypeAny, SSchema extends z.ZodTypeAny>(
  def: WidgetDefinition<PSchema, SSchema>
) {
  if (!def.component && !def.getComponent) {
    throw new Error(`Widget "${def.widgetKey}" needs component or getComponent`);
  }
  return def;
}
