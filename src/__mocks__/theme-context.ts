import { createRef } from "react";
import type { ThemeContextType } from "@/providers/ThemeProvider/theme-context";
import { DEFAULT } from "@/theme";

export const mockThemeContext: ThemeContextType = {
  targetRef: createRef(),
  isGlobal: true,
  isInherited: false,
  isScoped: false,
  isCustom: false,
  scope: "global",
  id: "global-main",
  prefs: DEFAULT.THEME,
  updatePrimaryColor: jest.fn(),
  updateAccentColor: jest.fn(),
  updateFontSize: jest.fn(),
  updateFontFamily: jest.fn(),
  updateMode: jest.fn(),
  resetTheme: jest.fn(),
  applyThemeStyles: jest.fn(),
  updateThemePreferences: jest.fn(),
  element: document.body,
};
