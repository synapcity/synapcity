import { EntityType } from "@/types/entity";
import { SemanticColor } from "./colors/types";
import { FontSizeToken } from "./font/types";

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
