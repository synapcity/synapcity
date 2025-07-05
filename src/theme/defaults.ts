import { defaultFonts } from "./font";
import type { ThemePreferences } from "./types";
import { defaultPrimary, defaultAccent } from "@/theme/colors/defaults";

export const DEFAULT_LANGUAGE = "en";
export const DEFAULT_DARK_MODE = "light";

export const DEFAULT_THEME: ThemePreferences = {
	language: DEFAULT_LANGUAGE,
	mode: DEFAULT_DARK_MODE,
	primary: defaultPrimary,
	accent: defaultAccent,
	...defaultFonts.default,
	inheritsFromGlobalTheme: true,
};
