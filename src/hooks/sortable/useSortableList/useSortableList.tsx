/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

export function useSortableList<T extends { id: string }>(initialItems: T[]) {
  const [items, setItems] = useState(initialItems);
  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  return {
    items,
    setItems,
    activeId,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}
