import { DEFAULT } from "@/theme/defaults";
import { updateGlobalTheme } from "../updateGlobalTheme/updateGlobalTheme";

export function resetGlobalTheme() {
	updateGlobalTheme(DEFAULT.THEME);
}
