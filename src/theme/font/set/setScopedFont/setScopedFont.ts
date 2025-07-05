import { useThemeStore } from "@/stores";
import { EntityType } from "@/types/entity";

export function setScopedFont(
	scope: EntityType,
	id: string,
	key: "size" | "fontFamilyHeading" | "fontFamilyBody",
	value: string
) {
	useThemeStore.getState().setPreferences(scope, id, { [key]: value });
}
