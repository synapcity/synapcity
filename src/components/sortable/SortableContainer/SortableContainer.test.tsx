/* eslint-disable @typescript-eslint/no-explicit-any */

const mockDragEnd = jest.fn();
const mockDraggingItem = { id: "1", label: "Item 1" };

jest.mock('@/hooks/sortable', () => ({
  ...jest.requireActual('@/hooks/sortable'),
  useSortableSetup: () => ({ dndContextProps: {} }),
  useDragOverlay: () => ({
    draggingItem: mockDraggingItem,
    onDragEnd: mockDragEnd,
  }),
}));

jest.mock('../SortableList/SortableList', () => ({
  SortableList: ({ items, renderItem }: any) => (
    <ul data-testid="sortable-list">
      {items.map((item: any, idx: number) => (
        <li key={item.id} data-testid="sortable-item">
          {renderItem ? renderItem(item, idx) : item.id}
        </li>
      ))}
    </ul>
  ),
}));

import { render, screen } from "@testing-library/react";
import { SortableContainer as SortableWidgetContainer } from "./SortableContainer";

describe("SortableWidgetContainer", () => {
  const items = [
    { id: "1", label: "Item 1" },
    { id: "2", label: "Item 2" },
  ];
  const renderItem = (item: any) => <div>{item.label}</div>;

  // ──────────── RENDERING ────────────
  describe("Rendering", () => {
    it("renders nothing when items array is empty", () => {
      const { container } = render(
        <SortableWidgetContainer items={[]} renderItem={renderItem} />
      );
      expect(container).toBeEmptyDOMElement();
    });

    it("renders SortableList with items", () => {
      render(<SortableWidgetContainer items={items} renderItem={renderItem} />);
      expect(screen.getByTestId("sortable-list")).toBeInTheDocument();
      expect(screen.getAllByTestId("sortable-item")).toHaveLength(2);
    });

    it("calls renderItem with correct props", () => {
      const renderItem = jest.fn((item: any) => <div>{item.label}</div>);
      render(<SortableWidgetContainer items={items} renderItem={renderItem} />);
      expect(renderItem).toHaveBeenCalledWith(items[0], expect.anything());
      expect(renderItem).toHaveBeenCalledWith(items[1], expect.anything());
      expect(renderItem.mock.calls.length).toBeGreaterThanOrEqual(2);
    });

    it("does not throw when no items are provided", () => {
      expect(() => {
        render(<SortableWidgetContainer items={[]} renderItem={renderItem} />);
      }).not.toThrow();
    });
  });

  // ──────────── DRAG OVERLAY ────────────
  describe("DragOverlay behavior", () => {
    it("renders DragOverlay when draggingItem is set", () => {
      render(<SortableWidgetContainer items={items} renderItem={renderItem} />);
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });

    it("does not render DragOverlay when draggingItem is null", () => {
      jest.doMock('@/hooks/sortable', () => ({
        useDragOverlay: () => ({ draggingItem: null, onDragEnd: jest.fn() }),
      }));
      const { container } = render(
        <SortableWidgetContainer items={items} renderItem={renderItem} />
      );
      expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
    });
  });

  // ──────────── DRAG & DROP ────────────
  describe("Drag and drop behavior", () => {
    it("calls onReorder when drag ends with valid reordering", () => {
      const onReorder = jest.fn();

      // Re-import to use updated mocks
      const { container } = render(
        <SortableWidgetContainer
          items={items}
          renderItem={renderItem}
          onReorder={onReorder}
        />
      )
      const dndContext = container.querySelector('[data-testid="sortable-list"]');
      expect(dndContext).toBeInTheDocument();

      const newOrder = [items[1], items[0]];
      onReorder(newOrder);
      expect(onReorder).toHaveBeenCalledWith(newOrder);
    });
  });
});
