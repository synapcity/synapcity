import { migrateThemeStore } from "@/stores/themeStore/migrate";
import { DEFAULT_THEME } from "@/theme/defaults";

describe("migrateThemeStore", () => {
	it("adds fontFamilyHeading for version < 1", () => {
		const legacyState = {
			globalPreferences: {
				...DEFAULT_THEME,
				fontFamilyBody: "Inter",
				// fontFamilyHeading is missing
			},
			scopedPreferences: {
				note: {
					abc: {
						...DEFAULT_THEME,
						fontFamilyBody: "Arial",
						// fontFamilyHeading is missing
					},
				},
				dashboard: {},
				widget: {},
			},
		};

		const migrated = migrateThemeStore(legacyState, 0); // simulate v0

		expect(migrated.globalPreferences.fontFamilyHeading).toBe("Inter");
		expect(migrated.scopedPreferences.note.abc.fontFamilyHeading).toBe("Arial");
	});

	it("returns state unmodified for version >= 1", () => {
		const state = {
			globalPreferences: {
				...DEFAULT_THEME,
				fontFamilyBody: "Inter",
				fontFamilyHeading: "Grotesk",
			},
			scopedPreferences: {
				note: {
					abc: {
						...DEFAULT_THEME,
						fontFamilyBody: "Arial",
						fontFamilyHeading: "Georgia",
					},
				},
				dashboard: {},
				widget: {},
			},
		};

		const migrated = migrateThemeStore(state, 2);

		expect(migrated.globalPreferences.fontFamilyHeading).toBe("Grotesk");
		expect(migrated.scopedPreferences.note.abc.fontFamilyHeading).toBe(
			"Georgia"
		);
	});
});
