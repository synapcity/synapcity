import { setColor } from "./setColor";
import { generateSemanticColor } from "@/theme/colors/generate";
import { useThemeStore } from "@/stores";

jest.mock("@/theme/colors/generate", () => ({
	generateSemanticColor: jest.fn(() => "semanticColorObject"),
}));
jest.mock("@/stores", () => ({
	useThemeStore: {
		getState: jest.fn(() => ({
			setGlobalPreferences: jest.fn(),
		})),
	},
}));

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
