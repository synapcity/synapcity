import React from "react";
import { render } from "@testing-library/react";
import { SortableList } from "./SortableList";
import { SortableItem } from "../SortableItem/SortableItem";

jest.mock("../SortableItem/SortableItem", () => ({
  SortableItem: jest.fn(() => <div data-testid="sortable-item">Mock Item</div>),
}));

describe("SortableList", () => {
  const mockItems = [
    { id: "1", label: "Item 1" },
    { id: "2", label: "Item 2" },
    { id: "3", label: "Item 3" },
  ];

  const mockRenderItem = jest.fn(() => <div>Rendered Item</div>);
  const mockHandleDragEnd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a SortableItem for each item", () => {
    render(
      <SortableList
        items={mockItems}
        renderItem={mockRenderItem}
        handleDragEnd={mockHandleDragEnd}
      />
    );

    expect(SortableItem).toHaveBeenCalledTimes(mockItems.length);
  });

  it("calls renderItem with correct props", () => {
    render(
      <SortableList
        items={mockItems}
        renderItem={mockRenderItem}
        handleDragEnd={mockHandleDragEnd}
      />
    );

    mockItems.forEach((item, index) => {
      const call = (SortableItem as unknown as jest.Mock).mock.calls[index][0];

      expect(call.item).toEqual(item);
      const rendered = call.renderItem(item, {
        isDragging: expect.any(Boolean),
        getSortableProps: expect.any(Function),
        handleDragEnd: mockHandleDragEnd,
      });

      expect(rendered).toBeDefined();
    });
  });
});
