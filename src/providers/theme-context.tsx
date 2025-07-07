"use client"

import React, { createContext } from 'react';
import { FontFamilyName, FontSizeToken, ThemeMode, ThemePreferences } from '@/theme';

export interface ThemeContextType {
  previewRef: React.RefObject<HTMLElement | null>;
  targetRef: React.RefObject<HTMLElement | null>;
  isGlobal: boolean;
  isInherited: boolean;
  isScoped: boolean;
  preview: ThemePreferences;
  updatePrimaryColor: (color: string, preview?: boolean) => void;
  updateAccentColor: (color: string, preview?: boolean) => void;
  updateFontSize: (fontSize: FontSizeToken, preview?: boolean) => void
  updateFontFamily: (name: FontFamilyName, fontFamily: string, preview?: boolean) => void;
  updateMode: (mode: ThemeMode, preview?: boolean) => void;
  // globalPrefs: ThemePreferences;
  // scopedPrefs: ThemePreferences | null;
  prefs: ThemePreferences
  resetTheme: () => void;
  isCustom: boolean;
  updateTheme: () => void;
}


export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);