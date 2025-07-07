jest.mock("@/theme/generateValues/colors", () => ({
	generateSemanticColor: jest.fn(() => "semanticColorObject"),
}));

jest.mock("@/stores", () => ({
	useThemeStore: {
		getState: jest.fn(() => ({
			setPreferences: jest.fn(),
			setGlobalPreferences: jest.fn(),
		})),
	},
}));

import { setScopedColor, setColor } from "./setColors";
import { generateSemanticColor } from "@/theme/generateValues/colors";
import { useThemeStore } from "@/stores";

describe("setScopedColor", () => {
	it("generates scoped color and updates preferences for scope + id", () => {
		const setPreferences = jest.fn();

		(useThemeStore.getState as jest.Mock).mockReturnValueOnce({
			setPreferences,
		});

		setScopedColor("note", "note-123", "primary", "#abcdef");

		expect(generateSemanticColor).toHaveBeenCalledWith("#abcdef");
		expect(setPreferences).toHaveBeenCalledWith("note", "note-123", {
			primary: "semanticColorObject",
		});
	});
});

describe("setColor", () => {
	it("generates semantic color and updates global preferences", () => {
		const setGlobalPreferences = jest.fn();

		(useThemeStore.getState as jest.Mock).mockReturnValueOnce({
			setGlobalPreferences,
		});

		setColor("accent", "#123456");

		expect(generateSemanticColor).toHaveBeenCalledWith("#123456");
		expect(setGlobalPreferences).toHaveBeenCalledWith({
			accent: "semanticColorObject",
		});
	});
});
