"use client";

// import { Widget } from "@/widgets/types";
// import { WidgetRenderer } from "@/widgets/WidgetRenderer";
import React, { Suspense } from "react";
import { cn } from "@/utils";
import { GridItemContainer } from "../GridItemContainer";
// import { WidgetProviders } from "@/widgets/WidgetProviders";
// import { WidgetToolbar } from "@/widgets/WidgetToolbar";
// import { StatusIndicator } from "@/components/atoms/StatusIndicator";

interface GridItemProps {
  // widget: Widget;
  className?: string;
  style?: React.CSSProperties;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLDivElement>) => void;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, style, onMouseDown, onMouseUp, onTouchEnd }, ref) => {
    // const widgets = useGridStore((state) => state.getWidgetsForCurrentDashboard)()
    // const gridWidget = widgets[widget.id];
    // console.log("widgets", widgets, "widget", gridWidget)
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col size-full relative overflow-hidden rounded-lg shadow-md group",
          className
        )}
        style={style}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        data-testid="grid-item"
      >
        {/* <WidgetProviders widgetId={widget.id}> */}
        <GridItemContainer isLocked={false}>
          {/* <WidgetToolbar widgetId={widget.id} isLocked={false} /> */}
          <div className="flex-1 overflow-hidden p-2 relative pt-6">
            <Suspense fallback={<div>Loading widget...</div>}>
              {/* <WidgetRenderer id={widget.id} type={widget.type} /> */}
            </Suspense>
            {/* <StatusIndicator id={widget.id} type="widget" className="absolute bottom-4 right-4" /> */}
          </div>
        </GridItemContainer>
        {/* </WidgetProviders> */}
      </div>
    );
  }
);
GridItem.displayName = "GridItem";
