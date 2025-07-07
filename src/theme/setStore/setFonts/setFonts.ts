import { useThemeStore } from "@/stores";
import { EntityType } from "@/theme/types/entity";

export function setGlobalFonts(
	key: "size" | "fontFamilyHeading" | "fontFamilyBody",
	value: string
) {
	useThemeStore.getState().setGlobalPreferences({ [key]: value });
}

export function setScopedFonts(
	scope: EntityType,
	id: string,
	key: "size" | "fontFamilyHeading" | "fontFamilyBody",
	value: string
) {
	useThemeStore.getState().setPreferences(scope, id, { [key]: value });
}
