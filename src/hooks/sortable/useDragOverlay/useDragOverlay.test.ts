import { renderHook, act } from "@testing-library/react";
import { useDragOverlay } from "./useDragOverlay";

type Item = { id: string; name?: string };

describe("useDragOverlay hook", () => {
  it("should initialize draggingItem as null", () => {
    const { result } = renderHook(() => useDragOverlay<Item>());
    expect(result.current.draggingItem).toBeNull();
  });

  it("should set draggingItem on onDragStart", () => {
    const { result } = renderHook(() => useDragOverlay<Item>());
    const item = { id: "1", name: "Test Item" };

    act(() => {
      result.current.onDragStart(item);
    });

    expect(result.current.draggingItem).toEqual(item);
  });

  it("should reset draggingItem to null on onDragEnd", () => {
    const { result } = renderHook(() => useDragOverlay<Item>());
    const item = { id: "1", name: "Test Item" };

    act(() => {
      result.current.onDragStart(item);
    });
    expect(result.current.draggingItem).toEqual(item);

    act(() => {
      result.current.onDragEnd();
    });

    expect(result.current.draggingItem).toBeNull();
  });
});
