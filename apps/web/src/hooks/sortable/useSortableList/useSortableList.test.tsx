import { renderHook, act } from "@testing-library/react";
import { useSortableList } from "./useSortableList";

type Item = { id: string; name?: string };

describe("useSortableList hook", () => {
  const initialItems: Item[] = [
    { id: "1", name: "One" },
    { id: "2", name: "Two" },
    { id: "3", name: "Three" },
  ];

  it("initializes with given items and activeId null", () => {
    const { result } = renderHook(() => useSortableList(initialItems));
    expect(result.current.items).toEqual(initialItems);
    expect(result.current.activeId).toBeNull();
  });

  it("sets activeId on handleDragStart", () => {
    const { result } = renderHook(() => useSortableList(initialItems));
    act(() => {
      result.current.handleDragStart({ active: { id: "2" } });
    });
    expect(result.current.activeId).toBe("2");
  });

  it("reorders items correctly on handleDragEnd when active and over ids differ", () => {
    const { result } = renderHook(() => useSortableList(initialItems));
    // Start dragging item with id "1"
    act(() => {
      result.current.handleDragStart({ active: { id: "1" } });
    });
    // Drop over item with id "3"
    act(() => {
      result.current.handleDragEnd({ active: { id: "1" }, over: { id: "3" } });
    });
    // Expect "1" to move from index 0 to index 2 (end)
    expect(result.current.items.map((i) => i.id)).toEqual(["2", "3", "1"]);
    expect(result.current.activeId).toBeNull();
  });

  it("does not reorder items if active and over ids are the same on handleDragEnd", () => {
    const { result } = renderHook(() => useSortableList(initialItems));
    act(() => {
      result.current.handleDragStart({ active: { id: "2" } });
    });
    act(() => {
      // Drag ends on same id "2"
      result.current.handleDragEnd({ active: { id: "2" }, over: { id: "2" } });
    });
    // Items should remain in original order
    expect(result.current.items).toEqual(initialItems);
    expect(result.current.activeId).toBeNull();
  });

  it("resets activeId on handleDragCancel", () => {
    const { result } = renderHook(() => useSortableList(initialItems));
    act(() => {
      result.current.handleDragStart({ active: { id: "3" } });
    });
    expect(result.current.activeId).toBe("3");
    act(() => {
      result.current.handleDragCancel();
    });
    expect(result.current.activeId).toBeNull();
  });
});
