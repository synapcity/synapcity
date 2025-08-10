import type { EntityType } from "@/theme/types/entity";
import type { SemanticColor } from "./colors";
import type { FontSizeToken } from "./fonts";

export type ThemeMode = "light" | "dark";

export interface ThemePreferences {
  language: string;
  mode: ThemeMode;

  primary: SemanticColor;
  accent: SemanticColor;

  fontSize: FontSizeToken;
  fontFamilyBody: string;
  fontFamilyHeading: string;

  inheritsFromGlobalTheme: boolean;
}

export type ThemeScope = "global" | EntityType;
export * from "./colors";
export * from "./fonts";
export * from "./entity";
export * from "./search";
