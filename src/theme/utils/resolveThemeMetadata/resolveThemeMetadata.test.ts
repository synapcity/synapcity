import { ThemeMode } from "@/theme/types";
import { resolveThemeMetadata } from "../resolveThemeMetadata";
import { DEFAULT } from "@/theme/defaults";

describe("resolveThemeMetadata", () => {
  const globalPreferences = { ...DEFAULT.THEME, mode: "dark" as ThemeMode };

  it("resolves global metadata", () => {
    const result = resolveThemeMetadata({
      entityType: "global",
      entityId: undefined,
      globalPreferences,
      scopedPreferences: {},
    });

    expect(result).toMatchObject({
      isGlobal: true,
      isScoped: false,
      isInherited: false,
      preferences: globalPreferences,
      isCustom: false,
    });
  });

  it("resolves scoped custom metadata", () => {
    const scopedPreferences = {
      note: {
        abc: {
          ...DEFAULT.THEME,
          mode: "dark" as ThemeMode,
          inheritsFromGlobalTheme: false,
        },
      },
      dashboard: {},
      widget: {},
    };

    const result = resolveThemeMetadata({
      entityType: "note",
      entityId: "abc",
      globalPreferences,
      scopedPreferences: scopedPreferences["note"],
    });

    expect(result).toMatchObject({
      isGlobal: false,
      isScoped: true,
      isInherited: false,
      preferences: scopedPreferences.note.abc,
      isCustom: true,
    });
  });

  it("resolves scoped metadata with inheritance", () => {
    const scopedPreferences = {
      note: {
        abc: {
          ...DEFAULT.THEME,
          inheritsFromGlobalTheme: true,
        },
      },
      dashboard: {},
      widget: {},
    };

    const result = resolveThemeMetadata({
      entityType: "note",
      entityId: "abc",
      globalPreferences,
      scopedPreferences: scopedPreferences["note"],
    });

    expect(result).toMatchObject({
      isInherited: true,
      preferences: globalPreferences,
    });
  });

  it("resolves scoped metadata when scoped prefs are missing", () => {
    const result = resolveThemeMetadata({
      entityType: "note",
      entityId: "missing-id",
      globalPreferences,
      scopedPreferences: {},
    });

    expect(result).toMatchObject({
      isInherited: false,
      preferences: globalPreferences,
    });
  });
});
