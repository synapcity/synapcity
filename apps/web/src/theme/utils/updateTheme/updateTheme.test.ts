const mockSetPreferences = jest.fn();
const mockSetGlobalPreferences = jest.fn();

jest.mock("@/stores", () => ({
  useThemeStore: {
    getState: () => ({
      globalPreferences: {
        ...DEFAULT.THEME,
        mode: "dark",
        fontSize: "md",
        fontFamilyBody: "Inter",
        fontFamilyHeading: "Grotesk",
        primary: { name: "blue", color: "#0000ff" },
        accent: { name: "pink", color: "#ff00ff" },
      },
      setPreferences: mockSetPreferences,
      setGlobalPreferences: mockSetGlobalPreferences,
    }),
  },
}));

jest.mock("@/theme/applyCss", () => ({
  applyColorVars: jest.fn(),
  applyGlobalFontVars: jest.fn(),
  applyScopedFontVars: jest.fn(),
  applyGlobalModeVars: jest.fn(),
  applyScopedModeVars: jest.fn(),
}));

jest.mock("@/utils", () => ({
  getUpdatedValues: jest.fn(() => ({
    fontSize: "lg",
    fontFamilyBody: "Roboto",
  })),
}));

import { updateGlobalTheme, updateScopedTheme } from "@/theme/utils/updateTheme";
import { DEFAULT, defaultAccent, defaultPrimary } from "@/theme/defaults";
import type { ThemePreferences } from "@/theme/types";
import {
  applyColorVars,
  applyScopedFontVars,
  applyScopedModeVars,
  applyGlobalFontVars,
  applyGlobalModeVars,
} from "@/theme/applyCss";

describe("updateScopedTheme", () => {
  beforeEach(() => jest.clearAllMocks());

  it("updates scoped preferences and applies styles", () => {
    const el = document.createElement("div");
    const preferences: ThemePreferences = {
      ...DEFAULT.THEME,
      mode: "light",
      fontSize: "sm",
      fontFamilyBody: "Inter",
      fontFamilyHeading: "Grotesk",
      primary: defaultPrimary,
      accent: defaultAccent,
      language: "en",
    };

    updateScopedTheme("note", "123", preferences, { fontSize: "lg" }, el);

    expect(mockSetPreferences).toHaveBeenCalledWith("note", "123", {
      fontSize: "lg",
    });

    expect(applyColorVars).toHaveBeenCalledWith(preferences.primary, "light", "primary", el);
    expect(applyColorVars).toHaveBeenCalledWith(preferences.accent, "light", "accent", el);

    expect(applyScopedFontVars).toHaveBeenCalledWith({
      postfix: "size",
      size: "lg",
      element: el,
    });

    expect(applyScopedFontVars).toHaveBeenCalledWith({
      postfix: "body",
      fontFamily: "Inter",
      element: el,
    });

    expect(applyScopedFontVars).toHaveBeenCalledWith({
      postfix: "heading",
      fontFamily: "Grotesk",
      element: el,
    });

    expect(applyScopedModeVars).toHaveBeenCalledWith("light", el);
  });
});

describe("updateGlobalTheme", () => {
  beforeEach(() => jest.clearAllMocks());

  it("updates global theme with diff and applies styles", () => {
    updateGlobalTheme({ fontSize: "lg", fontFamilyBody: "Roboto" });

    expect(mockSetGlobalPreferences).toHaveBeenCalledWith(
      expect.objectContaining({
        fontSize: "lg",
        fontFamilyBody: "Roboto",
      })
    );

    expect(applyColorVars).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      "primary",
      document.body
    );
    expect(applyColorVars).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      "accent",
      document.body
    );

    expect(applyGlobalFontVars).toHaveBeenCalledWith({
      postfix: "size",
      size: "lg",
    });

    expect(applyGlobalFontVars).toHaveBeenCalledWith({
      postfix: "body",
      fontFamily: "Roboto",
    });

    expect(applyGlobalFontVars).toHaveBeenCalledWith({
      postfix: "heading",
      fontFamily: expect.any(String),
    });

    expect(applyGlobalModeVars).toHaveBeenCalledWith(expect.any(String));
  });

  it("overrides global theme with defaults if overrideAll = true", () => {
    updateGlobalTheme({ fontSize: "xs" }, true);

    expect(mockSetGlobalPreferences).toHaveBeenCalledWith(
      expect.objectContaining({
        fontSize: "xs",
        primary: expect.any(Object),
        mode: expect.any(String),
      })
    );
  });
});
