import { z} from "zod";
import { ResourceSchema } from "../factory/base-schema";

export const WidgetDataSchema = z.object({
  label: z.string().min(1, "Label is required"),
  type: z.string().min(1, "Type is required")
})

export const WidgetResourceSchema = ResourceSchema(WidgetDataSchema);

export type Widget = z.infer<typeof WidgetResourceSchema>;

export type RawWidget = z.infer<typeof WidgetDataSchema>;

export function createWidget(partial: Partial<Widget> = {}): Widget {
  const now = new Date().toISOString();
  const base = {
    id: partial.id || crypto.randomUUID(),
    createdAt: partial.createdAt || now,
    updatedAt: partial.updatedAt || now,
    deletedAt: partial.deletedAt || null,
  }

  const widget = {
    ...base,
    label: partial.label || "Untitled",
    type: partial.type || "Widget"
  }

  return WidgetResourceSchema.parse(widget);
}