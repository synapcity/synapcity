/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SortableContainer } from "./SortableContainer";

type Item = {
  id: string;
  label: string;
};

const meta: Meta<typeof SortableContainer> = {
  title: "Sortable/SortableContainer",
  component: SortableContainer,
};
export default meta;

type Story = StoryObj<typeof SortableContainer>;

// Helper to simulate getSortableProps
const getMockSortableProps = (id: string, draggedId: string | null) => ({
  ref: undefined, // Not needed in Storybook
  style: {
    padding: "8px",
    marginBottom: "4px",
    background: id === draggedId ? "lightblue" : "white",
    border: "1px solid #ccc",
    cursor: "grab",
    opacity: id === draggedId ? 0.5 : 1,
    transition: "background 0.2s",
  },
});

const Component = () => {
  const [items, setItems] = useState<Item[]>([
    { id: "1", label: "First Item" },
    { id: "2", label: "Second Item" },
    { id: "3", label: "Third Item" },
  ]);

  const [draggedId, setDraggedId] = useState<string | null>(null);

  const renderItem = (item: Item, { getSortableProps }: any) => {
    const props = getSortableProps?.() ?? getMockSortableProps(item.id, draggedId);

    return (
      <div
        data-testid={`item-${item.id}`}
        {...props}
        onMouseEnter={() => setDraggedId(item.id)}
        onMouseLeave={() => setDraggedId(null)}
      >
        {item.label}
      </div>
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          const reordered = [...items];
          const moved = reordered.splice(0, 1)[0];
          reordered.splice(2, 0, moved); // move first item to last
          setItems(reordered);
        }}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          border: "1px solid #aaa",
          background: "#f0f0f0",
          cursor: "pointer",
        }}
      >
        Simulate Reorder
      </button>

      <SortableContainer
        items={items}
        onReorder={setItems}
        renderItem={renderItem}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <Component />,
};
export const Empty: Story = {
  render: () => (
    <SortableContainer
      items={[]}
      renderItem={() => null}
    />
  ),
};

const ComponentWithCustomDrag = () => {
  const [items, setItems] = useState<Item[]>([
    { id: "1", label: "First Item" },
    { id: "2", label: "Second Item" },
    { id: "3", label: "Third Item" },
  ]);

  const renderItem = (item: Item, { isDragging }: any) => (
    <div
      data-testid={`item-${item.id}`}
      style={{
        padding: "12px",
        marginBottom: "6px",
        background: isDragging ? "#d0f0c0" : "#fff",
        border: "2px solid #4caf50",
        borderRadius: "4px",
        boxShadow: isDragging ? "0 2px 8px rgba(0, 0, 0, 0.1)" : "none",
        transition: "background 0.2s, box-shadow 0.2s",
      }}
    >
      {item.label}
    </div>
  );

  return (
    <SortableContainer
      items={items}
      onReorder={setItems}
      renderItem={renderItem}
    />
  );
}
export const WithCustomStyles: Story = {
  render: () => <ComponentWithCustomDrag />,
};