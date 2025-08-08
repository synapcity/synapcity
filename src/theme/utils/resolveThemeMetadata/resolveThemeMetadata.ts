import { DEFAULT } from "@/theme/defaults";
import type { ThemePreferences } from "@/theme/types";
import type { EntityType } from "@/theme/types/entity";
import { isEqual } from "lodash";

export interface ThemeMetadataOptions {
	entityType: EntityType | "global";
	entityId?: string;
	scopedPreferences:  Record<string, ThemePreferences>;
	globalPreferences: ThemePreferences;
}

export interface ThemeMetadataInfo {
	preferences: ThemePreferences;
	isGlobal: boolean;
	isScoped: boolean;
	isInherited: boolean;
	isCustom: boolean;
}

export function resolveThemeMetadata({
	entityType,
	entityId,
	scopedPreferences,
	globalPreferences,
}: ThemeMetadataOptions): ThemeMetadataInfo {
	const isGlobal = entityType === "global" && !entityId;
	const isScoped = !isGlobal;

	const scoped = isScoped
		? scopedPreferences[entityId!]
		: undefined;

	const isInherited = scoped?.inheritsFromGlobalTheme === true;
	const preferences = !scoped || isInherited ? globalPreferences : scoped;
	const isCustom = !isEqual(preferences, DEFAULT.THEME);

	return {
		preferences,
		isGlobal,
		isScoped,
		isInherited,
		isCustom,
	};
}
