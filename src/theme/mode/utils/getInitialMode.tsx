import type { ThemeMode, ThemeScope } from "../../types";

export function getInitialMode(scope: ThemeScope, entityId?: string): ThemeMode | undefined {
  if (typeof window === "undefined") return "light";

  try {
    const stored = window.localStorage.getItem("themeStore");
    if (!stored) return "light";

    const parsed = JSON.parse(stored);
    const state = parsed?.state;

    if (scope === "global") {
      return state?.globalPreferences?.mode ?? "light";
    }

    if (!entityId) {
      console.warn(`entityId is missing for ${scope}`)
      return;
    }

    return state?.scopedPreferences?.[scope]?.[entityId]?.mode ?? "light";
  } catch {
    return "light";
  }
}
