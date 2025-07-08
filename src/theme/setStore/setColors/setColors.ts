import { useThemeStore } from "@/stores";
import { generateSemanticColor } from "@/theme/generateValues/colors";
import type { ColorType, EntityType } from "@/theme/types";

export function setColor(key: ColorType, hex: string) {
	const newColor = generateSemanticColor(hex);
	useThemeStore.getState().setGlobalPreferences({ [key]: newColor });
}

export function setScopedColor(
	scope: EntityType,
	id: string,
	key: ColorType,
	hex: string
) {
	const newAccent = generateSemanticColor(hex);
	useThemeStore.getState().setPreferences(scope, id, { [key]: newAccent });
}
