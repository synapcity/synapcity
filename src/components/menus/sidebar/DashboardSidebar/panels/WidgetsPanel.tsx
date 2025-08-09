"use client";

import { Input } from "@/components/atoms";
import {
  WidgetSkeleton,
  widgetRegistry,
  type WidgetKey,
  useWidgetComponent,
} from "@/widgets";

function WidgetPreview({ widgetKey }: { widgetKey: WidgetKey }) {
  const def = widgetRegistry[widgetKey];
  const Comp = useWidgetComponent(widgetKey);

  if (!Comp) {
    return <WidgetSkeleton />;
  }

  return (
    <Comp
      widgetId={def.id}
      props={def.defaultProps}
      settings={def.defaultSettings}
      className="h-full w-full"
    />
  );
}

export default function WidgetsPanel() {
  return (
    <div className="size-full flex">
      <div className="flex-1 flex-col flex">
        <div className="flex">
          <Input className="flex-1" />
        </div>
        <div className="flex-1 grid grid-cols-1 gap-4">
          {Object.keys(widgetRegistry).map((key) => (
            <WidgetPreview key={key} widgetKey={key as WidgetKey} />
          ))}
        </div>
      </div>
    </div>
  );
}