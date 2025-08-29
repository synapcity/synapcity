import { applyThemeVars } from "./applyThemeVars";
import { applyScopedFontVars, applyScopedModeVars } from "@/theme/applyCss";
import { applyVars } from "@/theme/applyCss/applyVars";
import type { FontSizeToken, ThemeMode, ThemePreferences } from "@/theme/types";

jest.mock("@/theme/applyCss", () => ({
  applyColorVars: jest.fn(),
  applyScopedModeVars: jest.fn(),
  applyScopedFontVars: jest.fn(),
}));

jest.mock("@/theme/applyCss/applyVars", () => ({
  applyVars: jest.fn(),
}));

jest.mock("@/theme/generateCss/generateColorVars", () => ({
  generateColorVars: jest.fn((color, mode, type) => ({
    [`--${type}-color`]: `${color.base}-${mode}`,
  })),
}));

describe("applyThemeVars", () => {
  const mockElement = document.createElement("div");

  const mockScale = {
    50: "",
    100: "",
    200: "",
    300: "",
    400: "",
    500: "",
    600: "",
    700: "",
    800: "",
    900: "",
    950: "",
  };

  const preferences: ThemePreferences = {
    mode: "light",
    fontSize: "md",
    fontFamilyBody: "Inter",
    fontFamilyHeading: "Grotesk",
    primary: {
      base: "#111",
      light: { background: "#fff", foreground: "#000", scale: mockScale },
      dark: { background: "#000", foreground: "#fff", scale: mockScale },
    },
    accent: {
      base: "#222",
      light: { background: "#eee", foreground: "#111", scale: mockScale },
      dark: { background: "#111", foreground: "#eee", scale: mockScale },
    },
    inheritsFromGlobalTheme: false,
    language: "en",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("applies vars using preferences.mode", () => {
    applyThemeVars({ preferences, element: mockElement });

    expect(applyScopedModeVars).toHaveBeenCalledWith("light", mockElement);

    expect(applyScopedFontVars).toHaveBeenCalledWith({
      element: mockElement,
      postfix: "size",
      size: "md" as FontSizeToken,
    });
    expect(applyScopedFontVars).toHaveBeenCalledWith({
      element: mockElement,
      postfix: "body",
      fontFamily: "Inter",
    });
    expect(applyScopedFontVars).toHaveBeenCalledWith({
      element: mockElement,
      postfix: "heading",
      fontFamily: "Grotesk",
    });
  });

  it("respects modeOverride", () => {
    applyThemeVars({
      preferences,
      element: mockElement,
      modeOverride: "dark" as ThemeMode,
    });

    expect(applyScopedModeVars).toHaveBeenCalledWith("dark", mockElement);
  });

  it("returns early if element is not provided", () => {
    // @ts-expect-error intentionally missing element
    applyThemeVars({ preferences });

    expect(applyScopedModeVars).not.toHaveBeenCalled();
    expect(applyScopedFontVars).not.toHaveBeenCalled();
    expect(applyVars).not.toHaveBeenCalled();
  });

  it("skips font and color vars if not defined in preferences", () => {
    const partialPrefs = {
      mode: "light" as ThemeMode,
    };

    applyThemeVars({ preferences: partialPrefs, element: mockElement });

    expect(applyScopedModeVars).toHaveBeenCalledWith("light", mockElement);
    expect(applyVars).not.toHaveBeenCalled();
    expect(applyScopedFontVars).not.toHaveBeenCalled();
  });

  // 	it("falls back to DEFAULT mode if mode not set", () => {
  // 		const noModePrefs = { ...preferences, mode: undefined };
  // 		applyThemeVars({ preferences: noModePrefs, element: mockElement });
  // 		expect(applyScopedModeVars).toHaveBeenCalledWith("light", mockElement);
  // 	});
});
