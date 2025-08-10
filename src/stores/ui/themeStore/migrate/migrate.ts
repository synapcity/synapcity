import type { ScopedThemeState } from "../useThemeStore/useThemeStore";

export const migrateThemeStore = (persistedState: unknown, version: number): ScopedThemeState => {
  const state = persistedState as ScopedThemeState;

  if (version < 1) {
    state.globalPreferences.fontFamilyHeading = state.globalPreferences.fontFamilyBody;

    for (const scope in state.scopedPreferences) {
      const scoped = state.scopedPreferences[scope as keyof typeof state.scopedPreferences];
      for (const id in scoped) {
        scoped[id].fontFamilyHeading = scoped[id].fontFamilyBody;
      }
    }
  }

  return state;
};
