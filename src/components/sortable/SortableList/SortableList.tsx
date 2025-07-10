/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortableItem } from "../SortableItem/SortableItem";
import { SortableRenderItemProps } from "../SortableContainer/SortableContainer";

export type SortableListProps<T> = {
  items: T[];
  renderItem: SortableRenderItemProps<T>;
  handleDragEnd: (event: any) => void;
};

export function SortableList({ items, renderItem, handleDragEnd }: SortableListProps<any>) {

  return items.map((item) => (
    <SortableItem
      key={item.id}
      item={item}
      renderItem={(item, { isDragging, getSortableProps }) =>
        renderItem(item, {
          isDragging,
          getSortableProps,
          handleDragEnd,
        })
      }
    />
  ));
}