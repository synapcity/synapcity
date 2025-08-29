import type { ScopedThemeState } from "@/stores/ui/themeStore/useThemeStore";
import { DEFAULT } from "@/theme/defaults";
import type { ThemePreferences } from "@/theme/types";

export const mockTheme: ThemePreferences = {
  language: "en",
  mode: "light",
  primary: DEFAULT.THEME.primary,
  accent: DEFAULT.THEME.accent,
  fontSize: "md",
  fontFamilyBody: "Inter",
  fontFamilyHeading: "Grotesk",
  inheritsFromGlobalTheme: false,
};

export const mockSetPreferences = jest.fn();
export const mockSetGlobalPreferences = jest.fn();
export const mockResetGlobalPreferences = jest.fn();
export const mockResetScopedPreferences = jest.fn();
export const mockToggleGlobalMode = jest.fn();
export const mockToggleScopedMode = jest.fn();
export const mockInitScopedPreferences = jest.fn();
export const mockGetPreferences = jest.fn();

export const createMockThemeStoreState = (): ScopedThemeState => ({
  hasHydrated: true,
  setHasHydrated: jest.fn(),
  globalPreferences: { ...mockTheme },
  scopedPreferences: {
    note: {},
    dashboard: {},
    widget: {},
  },
  setPreferences: mockSetPreferences,
  setGlobalPreferences: mockSetGlobalPreferences,
  resetGlobalPreferences: mockResetGlobalPreferences,
  resetScopedPreferences: mockResetScopedPreferences,
  toggleGlobalMode: mockToggleGlobalMode,
  toggleScopedMode: mockToggleScopedMode,
  initScopedPreferences: mockInitScopedPreferences,
  getPreferences: mockGetPreferences,
});
