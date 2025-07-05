import { useThemeStore } from "@/stores/themeStore/useThemeStore";
import type { ThemePreferences } from "@/theme/types";
import type { EntityType } from "@/types/entity";

type UseThemePreferencesReturn = {
	preferences: ThemePreferences;
	setPreferences: (updates: Partial<ThemePreferences>) => void;
	isScoped: boolean;
	isInherited: boolean;
};

export function useThemePreferences(
	entityType: EntityType | "global",
	entityId?: string
): UseThemePreferencesReturn {
	const {
		globalPreferences,
		scopedPreferences,
		getPreferences,
		setGlobalPreferences,
		setPreferences: setScopedPreferences,
	} = useThemeStore();

	const isScoped = entityType !== "global" && !!entityId;

	const preferences =
		isScoped && entityId
			? getPreferences(entityType as EntityType, entityId)
			: globalPreferences;

	const isInherited = !!(
		isScoped &&
		entityId &&
		scopedPreferences[entityType as EntityType]?.[entityId]
			?.inheritsFromGlobalTheme === true
	);

	const setPreferences = (updates: Partial<ThemePreferences>) => {
		if (!isScoped || !entityId) {
			setGlobalPreferences(updates);
		} else {
			const mergedUpdates = {
				...updates,
				inheritsFromGlobalTheme:
					"inheritsFromGlobalTheme" in updates
						? updates.inheritsFromGlobalTheme
						: false,
			};

			setScopedPreferences(entityType as EntityType, entityId, mergedUpdates);
		}
	};

	return {
		preferences,
		setPreferences,
		isScoped,
		isInherited,
	};
}
