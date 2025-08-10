import { widgetRegistry, WidgetKey } from "../registry/index";
import { Widget, InstantiateOptions, WidgetResourceSchema } from "./widget-schema";

export function createWidget(partial: Partial<Widget> & InstantiateOptions = {}): Widget {
  if (!partial.widgetKey) {
    throw new Error("widgetKey is required");
  }
  const widgetKey = partial.widgetKey as WidgetKey;
  const now = new Date().toISOString();
  const def = widgetRegistry[widgetKey];
  if (!def) {
    throw new Error(`Unknown widget key: ${widgetKey}`);
  }

  const widget = {
    id: partial.id ?? crypto.randomUUID(),
    createdAt: partial.createdAt ?? now,
    updatedAt: partial.updatedAt ?? now,
    deletedAt: partial.deletedAt ?? null,
    widgetKey,
    label: partial.label ?? def?.name ?? "Untitled",
    type: partial.type ?? def?.type ?? "",
    category: partial.category ?? def?.category ?? [],
    icon: partial.icon ?? def?.icon ?? "Puzzle",
    description: def.description ?? "",
    props: { ...def.defaultProps, ...(partial.props ?? {}) },
    settings: { ...def.defaultSettings, ...(partial.settings ?? {}) },
    constraints: {
      ...(def?.constraints ?? {}),
      ...(partial.constraints ?? {}),
      lockAspectRatio:
        partial.constraints?.lockAspectRatio ?? def?.constraints?.lockAspectRatio ?? false,
    },
  } as const;

  return WidgetResourceSchema.parse(widget);
}
