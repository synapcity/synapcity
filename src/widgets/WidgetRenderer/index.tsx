"use client"

import { WidgetSkeleton } from "@/components";
import { useWidgetStore } from "@/stores";
import { cn } from "@/utils";
import { ReactNode, useMemo, Suspense } from "react";
import { widgetRegistry, WidgetKey } from "../registry";
import { MissingWidget } from "./fallbacks/MissingWidget";
import { useDevValidatePropsSettings } from "./useDevValidatePropsSetting";
import { useWidgetComponent } from "./useWidgetComponent";
import { WidgetErrorBoundary } from "./fallbacks/WidgetErrorBoundary";
import { useShallow } from "zustand/shallow";

type WidgetRendererProps = {
  widgetId: string;
  className?: string;
  /** Optional header slot rendered above the widget's content, inside the container. */
  headerSlot?: ReactNode;
  /** Provide your own fallback while lazy component loads. */
  loadingFallback?: ReactNode;
  /** Wrap the actual widget content; good for padding/frames. */
  contentWrapper?: (node: ReactNode) => ReactNode;
};

export function WidgetRenderer({
  widgetId,
  className,
  headerSlot,
  loadingFallback,
  contentWrapper,
}: WidgetRendererProps) {
  const widget = useWidgetStore(useShallow((s) => s.items[widgetId]));

  const def = useMemo(() => {
    if (!widget) return null;
    return widgetRegistry[widget.widgetKey as WidgetKey] ?? null;
  }, [widget]);

  const Comp = useWidgetComponent(def ? (widget.widgetKey as WidgetKey) : null);

  // Dev only: validate shapes so you catch issues early without mutating store
  useDevValidatePropsSettings(
    def ? (widget.widgetKey as WidgetKey) : null,
    widget?.props,
    widget?.settings
  );

  if (!widget) {
    return <MissingWidget message={`Widget not found: ${widgetId}`} />;
  }
  if (!def) {
    return <MissingWidget message={`Unknown widget type: ${widget.widgetKey}`} />;
  }

  const inner = Comp ? (
    <Comp
      widgetId={widget.id}
      props={widget.props}
      settings={widget.settings}
      className="h-full w-full"
    />
  ) : (
    loadingFallback ?? <WidgetSkeleton />
  );

  const wrapped = contentWrapper ? contentWrapper(inner) : inner;

  return (
    <WidgetErrorBoundary widgetId={widgetId}>
      <div
        className={cn("relative h-full w-full", className)}
        data-widget-type={def.id}
      >
        {headerSlot && (
          <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
            <div className="flex items-center justify-end gap-2 p-2 pointer-events-auto">
              {headerSlot}
            </div>
          </div>
        )}

        <Suspense fallback={loadingFallback ?? <WidgetSkeleton />}>
          {wrapped}
        </Suspense>
      </div>
    </WidgetErrorBoundary>
  );
}

export * from "./useWidgetComponent";
export * from "./fallbacks";
export * from "./useDevValidatePropsSetting"