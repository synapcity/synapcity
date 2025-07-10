/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
} from "@dnd-kit/sortable";
import { useCallback } from "react";
import { useSortableSetup, useDragOverlay } from "@/hooks/sortable";
import { SortableList } from "../SortableList/SortableList";
import { restrictToParentElement, restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";

export type SortableRenderItemProps<T> = (
  item: T,
  props: { isDragging: boolean; getSortableProps: () => any, handleDragEnd: (event: DragEndEvent) => void }
) => React.ReactNode;

type Props<T extends { id: string }> = {
  items: T[];
  renderItem: SortableRenderItemProps<T>;
  onReorder?: (items: T[]) => void;
};

export function SortableContainer<T extends { id: string }>({
  items,
  renderItem,
  onReorder,
}: Props<T>) {
  const { dndContextProps } = useSortableSetup()

  const { draggingItem, onDragEnd: clearOverlay } = useDragOverlay<T>();

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    const sorted = arrayMove(items, oldIndex, newIndex);
    onReorder?.(sorted);
    clearOverlay();
  }, [items, onReorder, clearOverlay]);

  if (items.length === 0) return null;
  return (
    <DndContext
      {...dndContextProps}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((item) => item.id)}>
        <SortableList renderItem={renderItem} handleDragEnd={handleDragEnd} items={items} />
      </SortableContext>
      {draggingItem && (
        <DragOverlay
          dropAnimation={null}
          modifiers={[restrictToParentElement, restrictToVerticalAxis, restrictToWindowEdges]}
        >
          {renderItem(draggingItem, {
            isDragging: true,
            getSortableProps: () => ({}),
            handleDragEnd,
          })}
        </DragOverlay>
      )}
    </DndContext >
  );
}

