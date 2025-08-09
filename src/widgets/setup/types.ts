// types.ts
import type React from "react";

export type WidgetComponentProps<P, S> = {
  widgetId: string;
  props: P;
  settings: S;
  className?: string;
  
};

export type WidgetModule<P, S> = {
  default: React.ComponentType<WidgetComponentProps<P, S>>;
};

/**
 * Wrap a dynamic importer and return a strongly-typed module promise.
 * You can still import `any` internally and re-cast once loaded to keep
 * the callsite simple and avoid union return types.
 */
export function lazyWidget<P, S>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  importer: () => Promise<{ default: React.ComponentType<any> }>
): () => Promise<WidgetModule<P, S>> {
  return async () => {
    const mod = await importer();
    return mod as WidgetModule<P, S>;
  };
}
