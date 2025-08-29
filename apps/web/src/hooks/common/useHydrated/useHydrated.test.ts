import { renderHook } from "@testing-library/react";
import { useHydrated } from "./useHydrated";
import { useThemeStore } from "@/stores/ui/themeStore/useThemeStore";

describe("useHydrated", () => {
  it("returns true when hasHydrated is true in store", () => {
    useThemeStore.setState({ hasHydrated: true });
    const { result } = renderHook(() => useHydrated());
    expect(result.current).toBe(true);
  });

  it("returns false when hasHydrated is false in store", () => {
    useThemeStore.setState({ hasHydrated: false });
    const { result } = renderHook(() => useHydrated());
    expect(result.current).toBe(false);
  });
});
