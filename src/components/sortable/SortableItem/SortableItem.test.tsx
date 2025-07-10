import { setDragging, useSortableMock } from "@/__mocks__/dnd-kit-sortable";
import { mockCSS } from "@/__mocks__/dnd-kit-utilities";

jest.mock("@dnd-kit/utilities", () => ({
  ...jest.requireActual("@dnd-kit/utilities"),
  CSS: mockCSS,
}));

jest.mock("@dnd-kit/sortable", () => ({
  useSortable: () => useSortableMock(),
}));

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render } from "@testing-library/react";
import { SortableItem } from "./SortableItem";


describe("SortableItem", () => {
  const mockItem = { id: "1", label: "Test Item" };
  beforeEach(() => {
    setDragging(false);
  })

  it("calls renderItem with correct props", () => {
    const renderItem = jest.fn(() => <div>Item</div>);

    render(
      <SortableItem item={mockItem} renderItem={renderItem} />
    );

    expect(renderItem).toHaveBeenCalledWith(
      mockItem,
      expect.objectContaining({
        isDragging: false,
        getSortableProps: expect.any(Function),
      })
    );
  });

  it("getSortableProps includes expected properties", () => {
    let props: any = {};
    const renderItem = (_: any, { getSortableProps }: any) => {
      props = getSortableProps();
      return <div {...props}>Item</div>;
    };

    render(<SortableItem item={mockItem} renderItem={renderItem} />);

    expect(props).toEqual(
      expect.objectContaining({
        ref: expect.any(Function),
        role: "listitem",
        onPointerDown: expect.any(Function),
        style: expect.objectContaining({
          transform: expect.stringContaining("translate3d("),
          transition: expect.any(String),
          cursor: "grab",
          opacity: 1,
        }),
      })
    );
  });
  it("applies correct styles when not dragging", () => {
    const renderItem = (_: any, { getSortableProps }: any) => {
      const props = getSortableProps();
      return <div {...props}>Item</div>;
    };

    const { container } = render(
      <SortableItem item={mockItem} renderItem={renderItem} />
    );

    const item = container.firstChild as HTMLElement;
    expect(item.style.transform).toBe("translate3d(10px, 20px, 0)");
    expect(item.style.opacity).toBe("1");
  });

  it("applies correct styles when dragging", () => {
    setDragging(true);

    const renderItem = (_: any, { getSortableProps }: any) => {
      const props = getSortableProps();
      return <div {...props}>Item</div>;
    };

    const { container } = render(
      <SortableItem item={mockItem} renderItem={renderItem} />
    );

    const item = container.firstChild as HTMLElement;
    expect(item.style.transform).toBe("translate3d(10px, 20px, 0)");
    expect(item.style.opacity).toBe("0.5");
  });
})