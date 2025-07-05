import { setScopedColor } from "./setScopedColor";
import { generateSemanticColor } from "@/theme/colors/generate";
import { useThemeStore } from "@/stores";

jest.mock("@/theme/colors/generate", () => ({
	generateSemanticColor: jest.fn(() => "scopedColorObject"),
}));
jest.mock("@/stores", () => ({
	useThemeStore: {
		getState: jest.fn(() => ({
			setPreferences: jest.fn(),
		})),
	},
}));

describe("setScopedColor", () => {
	it("generates scoped color and updates preferences for scope + id", () => {
		const setPreferences = jest.fn();
		(useThemeStore.getState as jest.Mock).mockReturnValueOnce({
			setPreferences,
		});

		setScopedColor("note", "note-123", "primary", "#abcdef");

		expect(generateSemanticColor).toHaveBeenCalledWith("#abcdef");
		expect(setPreferences).toHaveBeenCalledWith("note", "note-123", {
			primary: "scopedColorObject",
		});
	});
});
