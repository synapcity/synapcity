import { ThemePreferencesFormValues } from "@/components/molecules/theme/schema";
import { generateSemanticColor } from "@/theme/generateValues";
import { FontSizeToken } from "@/theme/types";

export const convertFormToPrefs = (data: ThemePreferencesFormValues) => {
	console.log("[convertFormToPrefs] data", data);
	const primary = generateSemanticColor(data.primary);
	console.log("[convertFormToPrefs] primary", primary);
	const accent = generateSemanticColor(data.accent);
	console.log("[convertFormToPrefs] accent", accent);
	const fontSize = data.fontSize as FontSizeToken;
	return {
		...data,
		primary,
		accent,
		fontSize,
	};
};
