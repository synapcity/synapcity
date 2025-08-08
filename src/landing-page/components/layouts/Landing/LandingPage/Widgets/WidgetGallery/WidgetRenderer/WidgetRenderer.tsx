"use client"

import React from "react";
import { type Widget } from "@/landing-page/types";
import { WidgetCard } from "../WidgetRenderer/WidgetCard";
import { getRandomPosition } from "@/landing-page/utils";

interface WidgetRendererProps {
  widget: Widget;
  isLast?: boolean;
  onLoadMore?: () => void;
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = ({ widget, isLast, onLoadMore }) => {
  const position = getRandomPosition(Number(widget.id));

  return (
    <div
      style={{
        alignSelf: position === 'top' ? 'flex-start' : position === 'bottom' ? 'flex-end' : 'center',
        maxHeight: widget.layout.h * 100,
        maxWidth: widget.layout.w * 100,
        width: widget.layout.w * 100,
        height: widget.layout.h * 100,
        minWidth: widget.layout.w * 100,
        minHeight: widget.layout.h * 100,
        ...widget.props.style
      }}
      className="widget-container size-full flex justify-center"
    >
      <WidgetCard widget={widget} isLast={isLast} onLoadMore={onLoadMore} />
    </div>
  );
};
