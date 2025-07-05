import { useThemeStore } from "@/stores";
import { generateSemanticColor } from "@/theme/colors/generate";
import type { ColorType } from "@/theme/colors/types";

export function setColor(key: ColorType, hex: string) {
	const newColor = generateSemanticColor(hex);
	useThemeStore.getState().setGlobalPreferences({ [key]: newColor });
}
