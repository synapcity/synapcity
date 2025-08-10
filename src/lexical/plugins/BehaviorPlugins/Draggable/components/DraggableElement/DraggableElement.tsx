import React, { DragEvent as ReactDragEvent, useCallback } from "react";
import { draggableStore } from "../../store/useDraggableStore";

import "./DraggableElement.css";
import { cn } from "@/utils";

export const DraggableElement = ({ className }: { className?: string }) => {
  const { draggable, resetState } = draggableStore.getState();

  const handleOnDragStart = useCallback(
    ({ dataTransfer }: ReactDragEvent<HTMLDivElement>) => {
      if (!dataTransfer || !draggable?.htmlElement) {
        return;
      }

      dataTransfer.setDragImage(draggable.htmlElement, 0, 0);
    },
    [draggable?.htmlElement]
  );

  if (!draggable?.data) {
    return null;
  }

  const scrollOffset = document.body.getBoundingClientRect().top;

  return (
    <div
      className={cn("draggable-element size-full", className)}
      draggable={true}
      onDragStart={handleOnDragStart}
      onDragEnd={resetState}
      style={{
        top: draggable.data.top - scrollOffset,
        left: (draggable.data.left ?? 0) - 12,
        height: draggable.data.height,
      }}
    />
  );
};
