/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "@testing-library/react";
import { useRef, useState, useEffect } from "react";
import { useApplyTheme } from "./useApplyTheme";
import { applyThemeVars } from "@/theme";

jest.mock("@/theme", () => ({
  ...jest.requireActual("@/theme"),
  applyThemeVars: jest.fn(),
}));

describe("useApplyTheme", () => {
  it("applies theme to provided element on mount and update", () => {
    const mockPreferences = { mode: "dark" };
    const mockElement = document.createElement("div");

    function TestComponent() {
      const ref = useRef<HTMLDivElement>(mockElement);
      const [prefs, setPrefs] = useState<any>(null);

      useApplyTheme(prefs, ref.current);

      useEffect(() => {
        setPrefs(mockPreferences);
      }, []);

      return <div />;
    }

    render(<TestComponent />);

    expect(applyThemeVars).toHaveBeenCalledWith({
      preferences: mockPreferences,
      element: mockElement,
    });
  });

  it("does nothing when preferences is null", () => {
    function TestComponent() {
      useApplyTheme(null, document.createElement("div"));
      return <div />;
    }

    render(<TestComponent />);
    expect(applyThemeVars).not.toHaveBeenCalled();
  });

  it("does nothing when element is null", () => {
    function TestComponent() {
      useApplyTheme({ mode: "dark" } as any, null);
      return <div />;
    }

    render(<TestComponent />);
    expect(applyThemeVars).not.toHaveBeenCalled();
  });
});
