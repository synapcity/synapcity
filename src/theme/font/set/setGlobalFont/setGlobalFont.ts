import { useThemeStore } from "@/stores";

export function setGlobalFont(
	key: "size" | "fontFamilyHeading" | "fontFamilyBody",
	value: string
) {
	useThemeStore.getState().setGlobalPreferences({ [key]: value });
}
