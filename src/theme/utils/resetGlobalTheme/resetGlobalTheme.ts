import { DEFAULT_THEME } from "@/theme/defaults";
import { updateGlobalTheme } from "../updateGlobalTheme/updateGlobalTheme";

export function resetGlobalTheme() {
	updateGlobalTheme(DEFAULT_THEME);
}
