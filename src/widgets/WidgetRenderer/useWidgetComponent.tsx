/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, ComponentType, useRef, useEffect } from "react";
import { WidgetKey, widgetRegistry } from "../registry";

export function useWidgetComponent(key: WidgetKey | null) {
  const def = key ? widgetRegistry[key] : null;
  const [Comp, setComp] = useState<ComponentType<any> | null>(def?.component ?? null);
  const loadedKey = useRef<string | null>(def?.id ?? null);

  useEffect(() => {
    let cancelled = false;
    if (!def) return;

    // if key changed, reset
    if (loadedKey.current !== def.id) {
      loadedKey.current = def.id;
      setComp(def.component ?? null);
    }

    if (!def.component && def.getComponent) {
      def.getComponent().then((m) => {
        if (!cancelled) setComp(() => m.default);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [def]);

  return Comp;
}
