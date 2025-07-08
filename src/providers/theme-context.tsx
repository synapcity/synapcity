"use client"

import React, { createContext } from 'react';
import { FontFamilyName, FontSizeToken, ThemeMode, ThemePreferences, ThemeScope } from '@/theme';
import { ThemePreferencesFormValues } from '@/components/molecules/theme/schema';

export interface ThemeContextType {
  previewRef: React.RefObject<HTMLElement | null>;
  targetRef: React.RefObject<HTMLElement | null>;
  isGlobal: boolean;
  isInherited: boolean;
  isScoped: boolean;
  previewTheme: ThemePreferences;
  updatePrimaryColor: (color: string, preview?: boolean) => void;
  updateAccentColor: (color: string, preview?: boolean) => void;
  updateFontSize: (fontSize: FontSizeToken, preview?: boolean) => void
  updateFontFamily: (name: FontFamilyName, fontFamily: string, preview?: boolean) => void;
  updateMode: (mode: ThemeMode, preview?: boolean) => void;
  prefs: ThemePreferences
  resetTheme: () => void;
  isCustom: boolean;
  updateTheme: (data: ThemePreferencesFormValues) => void;
  updatePreviewTheme: (data: ThemePreferences) => void;
  scope: ThemeScope;
  id: string;
}


export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);