import { useThemeStore } from "@/stores";
import { generateSemanticColor } from "@/theme/colors/generate";
import type { EntityType } from "@/types/entity";
import type { ColorType } from "@/theme/colors/types";

export function setScopedColor(
	scope: EntityType,
	id: string,
	key: ColorType,
	hex: string
) {
	const newAccent = generateSemanticColor(hex);
	useThemeStore.getState().setPreferences(scope, id, { [key]: newAccent });
}
