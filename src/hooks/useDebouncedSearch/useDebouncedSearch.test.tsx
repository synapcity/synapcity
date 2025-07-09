import { renderHook, act } from "@testing-library/react";
import { useDebouncedSearch } from "./useDebouncedSearch";

jest.useFakeTimers();

describe("useDebouncedSearch", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("calls searchFn after debounce delay", async () => {
    const searchFn = jest.fn().mockResolvedValue(["result"]);
    const { result } = renderHook(() =>
      useDebouncedSearch("test", searchFn, 300)
    );

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    await act(async () => { });

    expect(searchFn).toHaveBeenCalledWith("test");
    expect(result.current).toEqual(["result"]);
  });

  it("debounces repeated queries", async () => {
    const searchFn = jest.fn().mockResolvedValue(["result"]);
    const { rerender } = renderHook(
      ({ query }) => useDebouncedSearch(query, searchFn, 500),
      { initialProps: { query: "t" } }
    );

    rerender({ query: "te" });
    rerender({ query: "tes" });
    rerender({ query: "test" });

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    await act(async () => { });

    expect(searchFn).toHaveBeenCalledTimes(1);
    expect(searchFn).toHaveBeenCalledWith("test");
  });

  it("does not call searchFn if query is empty", async () => {
    const searchFn = jest.fn();
    renderHook(() => useDebouncedSearch("", searchFn, 200));

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    expect(searchFn).not.toHaveBeenCalled();
  });

  it("clears results when query becomes empty", async () => {
    const searchFn = jest.fn().mockResolvedValue(["result"]);
    const { result, rerender } = renderHook(
      ({ query }) => useDebouncedSearch(query, searchFn, 200),
      { initialProps: { query: "test" } }
    );

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    await act(async () => { });

    expect(result.current).toEqual(["result"]);

    rerender({ query: "" });

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toEqual([]);
  });

  it("cancels debounce on unmount", () => {
    const searchFn = jest.fn();
    const { unmount } = renderHook(() =>
      useDebouncedSearch("test", searchFn, 300)
    );

    unmount();
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(searchFn).not.toHaveBeenCalled();
  });
});
