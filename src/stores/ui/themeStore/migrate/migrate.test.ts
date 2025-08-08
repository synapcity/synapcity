import { migrateThemeStore } from "@/stores/ui/themeStore/migrate";
import { DEFAULT } from "@/theme/defaults";

describe("migrateThemeStore", () => {
	it("adds fontFamilyHeading for version < 1", () => {
		const legacyState = {
			globalPreferences: {
				...DEFAULT.THEME,
				fontFamilyBody: "Inter",
			},
			scopedPreferences: {
				note: {
					abc: {
						...DEFAULT.THEME,
						fontFamilyBody: "Arial",
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
				...DEFAULT.THEME,
				fontFamilyBody: "Inter",
				fontFamilyHeading: "Grotesk",
			},
			scopedPreferences: {
				note: {
					abc: {
						...DEFAULT.THEME,
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
