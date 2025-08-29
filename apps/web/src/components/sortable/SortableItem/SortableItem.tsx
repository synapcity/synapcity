import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useCallback } from "react";

type SortableItemProps<T extends { id: string }> = {
  item: T;
  children?: React.ReactNode;
  renderItem: (
    item: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sortableProps: { isDragging: boolean; getSortableProps: () => any }
  ) => React.ReactNode;
};

export const SortableItem = React.memo(function SortableItem<T extends { id: string }>({
  item,
  renderItem,
}: SortableItemProps<T>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = React.useMemo<React.CSSProperties>(
    () => ({
      transform: transform ? CSS.Transform.toString(transform) : undefined,
      transition: transition || undefined,
      cursor: "grab",
      opacity: isDragging ? 0.5 : 1,
    }),
    [transform, transition, isDragging]
  );

  const getSortableProps = useCallback(
    () => ({
      ref: setNodeRef,
      style,
      ...attributes,
      ...listeners,
    }),
    [setNodeRef, style, attributes, listeners]
  );

  return renderItem(item, {
    isDragging,
    getSortableProps,
  });
});
SortableItem.displayName = "SortableItem";
