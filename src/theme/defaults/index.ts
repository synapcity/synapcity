import { defaultFontValues } from "./fonts";
import type { ThemePreferences } from "../types";
import { defaultPrimary, defaultAccent } from "./colors";

const LANGUAGE = "en";
const MODE = "light";

const THEME: ThemePreferences = {
	language: LANGUAGE,
	mode: MODE,
	primary: defaultPrimary,
	accent: defaultAccent,
	...defaultFontValues,
	inheritsFromGlobalTheme: true,
};

export const DEFAULT = { LANGUAGE, MODE, THEME };
export { defaultAccent, defaultFontValues, defaultPrimary };
