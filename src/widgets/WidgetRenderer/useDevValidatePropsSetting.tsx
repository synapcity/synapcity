"use client"

import { useEffect } from "react";
import { WidgetKey, widgetRegistry } from "../registry";

export function useDevValidatePropsSettings(
  key: WidgetKey | null,
  props: unknown,
  settings: unknown
) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" || !key) return;
    const def = widgetRegistry[key];
    if (!def) return;

    const p = def.propsSchema.safeParse(props);
    if (!p.success) {
      console.warn(
        `[WidgetRenderer] props invalid for "${def.id}"`,
        p.error.issues.flat()
      );
    }

    const s = def.settingsSchema.safeParse(settings);
    if (!s.success) {
      console.warn(
        `[WidgetRenderer] settings invalid for "${def.id}"`,
        s.error.issues.flat()
      );
    }
  }, [key, props, settings]);
}
