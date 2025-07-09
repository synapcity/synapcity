import { ThemePreferencesFormValues } from "@/components/molecules/theme/schema";
import { generateSemanticColor } from "@/theme/generateValues";
import { FontSizeToken } from "@/theme/types";

export const convertFormToPrefs = (data: ThemePreferencesFormValues) => {
	const primary = generateSemanticColor(data.primary);
	const accent = generateSemanticColor(data.accent);
	const fontSize = data.fontSize as FontSizeToken;
	return {
		...data,
		primary,
		accent,
		fontSize,
	};
};
