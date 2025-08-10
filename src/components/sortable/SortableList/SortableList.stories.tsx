import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SortableList } from "./SortableList";

const meta: Meta<typeof SortableList> = {
  title: "Sortable/SortableList",
  component: SortableList,
};
export default meta;

type Story = StoryObj<typeof SortableList>;

const StoryWithMockDrag = () => {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const items = [
    { id: "1", label: "First Item" },
    { id: "2", label: "Second Item" },
    { id: "3", label: "Third Item" },
  ];

  type Item = { id: string; label: string };
  type RenderItemContext = {
    isDragging: boolean;
    getSortableProps?: () => React.HTMLAttributes<HTMLDivElement>;
  };

  const renderItem = (item: Item, { isDragging, getSortableProps }: RenderItemContext) => {
    const dragging = isDragging || item.id === draggedId;

    return (
      <div
        {...getSortableProps?.()}
        data-testid={`item-${item.id}`}
        onMouseEnter={() => setDraggedId(item.id)} // Simulate drag start
        onMouseLeave={() => setDraggedId(null)} // Simulate drag end
        style={{
          padding: "8px",
          marginBottom: "4px",
          background: dragging ? "lightblue" : "white",
          border: "1px solid #ccc",
          transition: "background 0.2s",
        }}
      >
        {item.label}
      </div>
    );
  };

  return <SortableList items={items} renderItem={renderItem} handleDragEnd={() => {}} />;
};

export const WithMockDragVisual: Story = {
  render: () => <StoryWithMockDrag />,
};
