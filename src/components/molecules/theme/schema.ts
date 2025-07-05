import { z } from "zod";

export const themePreferencesSchema = z.object({
	language: z.string(),
	mode: z.enum(["light", "dark", "system"]),
	fontSize: z.string(),
	fontFamilyBody: z.string(),
	fontFamilyHeading: z.string(),
	inheritsFromGlobalTheme: z.boolean(),

	primary: z.object({
		base: z.string(),
		dark: z.object({
			background: z.string(),
			foreground: z.string(),
			scale: z.record(z.string()),
		}),
		light: z.object({
			background: z.string(),
			foreground: z.string(),
			scale: z.record(z.string()),
		}),
	}),

	accent: z.object({
		base: z.string(),
		dark: z.object({
			background: z.string(),
			foreground: z.string(),
			scale: z.record(z.string()),
		}),
		light: z.object({
			background: z.string(),
			foreground: z.string(),
			scale: z.record(z.string()),
		}),
	}),
});

export type ThemePreferencesFormValues = z.infer<typeof themePreferencesSchema>;
