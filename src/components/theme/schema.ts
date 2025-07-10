import { z } from "zod";

export const themePreferencesSchema = z.object({
	language: z.string(),
	mode: z.enum(["light", "dark"]),
	fontSize: z.string(),
	fontFamilyBody: z.string(),
	fontFamilyHeading: z.string(),
	inheritsFromGlobalTheme: z.boolean(),
	primary: z.string().regex(/^#([0-9A-Fa-f]{6})$/),
	accent: z.string().regex(/^#([0-9A-Fa-f]{6})$/),
});

export type ThemePreferencesFormValues = z.infer<typeof themePreferencesSchema>;
