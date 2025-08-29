"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Generic droppable container used by drag-and-drop examples
export function DroppableList({
  id,
  children,
  className = "p-2 border rounded",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
}

// Utility to find which list contains an item by id
export function findContainer<T extends { id: string }>(
  lists: Record<string, T[]>,
  id: string
): string | null {
  for (const key in lists) {
    if (lists[key].some((t) => t.id === id)) return key;
  }
  return null;
}

// Simple sortable item used in examples
export function SortableListItem({
  id,
  children,
  className = "p-2 mb-2 bg-white rounded shadow cursor-move",
  ...props
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}
