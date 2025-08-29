"use client";

import React, { createContext } from "react";
import { FontFamilyName, FontSizeToken, ThemeMode, ThemePreferences, ThemeScope } from "@/theme";

export interface ThemeContextType {
  targetRef: React.RefObject<HTMLElement | null>;
  isGlobal: boolean;
  isInherited: boolean;
  isScoped: boolean;
  updatePrimaryColor: (color: string, preview?: boolean) => void;
  updateAccentColor: (color: string, preview?: boolean) => void;
  updateFontSize: (fontSize: FontSizeToken, preview?: boolean) => void;
  updateFontFamily: (name: FontFamilyName, fontFamily: string, preview?: boolean) => void;
  updateMode: (mode: ThemeMode, preview?: boolean) => void;
  updateThemePreferences: (theme: Partial<ThemePreferences>) => void;
  applyThemeStyles: (prefs: Partial<ThemePreferences>) => void;
  prefs: ThemePreferences;
  resetTheme: () => void;
  isCustom: boolean;
  scope: ThemeScope;
  id: string;
  element: HTMLElement | null;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
