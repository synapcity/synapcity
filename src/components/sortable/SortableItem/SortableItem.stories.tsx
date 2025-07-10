import React from "react";
import { SortableItem } from "./SortableItem";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

const meta = {
  title: "Sortable/SortableItem",
  component: SortableItem,
};

export default meta;

const mockItem = { id: "1", label: "Item 1" };

export const Default = () => (
  <DndContext>
    <SortableContext items={[mockItem.id]}>
      <SortableItem
        item={mockItem}
        renderItem={(item, { getSortableProps }) => (
          <div {...getSortableProps()} className="bg-white border p-4 rounded shadow">
            Hello
          </div>
        )}
      />
    </SortableContext>
  </DndContext>
);
