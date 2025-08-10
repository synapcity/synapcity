import { renderHook } from "@testing-library/react";
import { useFramerScroller } from "./useFramerScroller";

jest.mock("framer-motion", () => ({
  useAnimation: jest.fn(() => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  })),
  useMotionValue: jest.fn(() => ({
    on: jest.fn(() => () => { }),
    set: jest.fn(),
    get: jest.fn(),
  })),
}));

describe("useFramerScroller", () => {
  it("sets isMounted true on mount and false on unmount", () => {
    const { result, unmount } = renderHook(() =>
      useFramerScroller({ animation: {}, getTotalWidth: () => 0 })
    );

    const startSpy = result.current.controls.start as jest.Mock;
    const start = result.current.start;

    start();
    expect(startSpy).toHaveBeenCalled();

    startSpy.mockClear();
    unmount();

    start();
    expect(startSpy).not.toHaveBeenCalled();
  });
});