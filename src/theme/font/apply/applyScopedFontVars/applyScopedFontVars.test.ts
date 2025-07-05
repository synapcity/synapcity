import { applyScopedFontVars } from "../applyScopedFontVars";
import { generateFontSizeVars } from "../../generate";
import { applyVars } from "../../../utils/applyVars/applyVars";

jest.mock("../../generate");
jest.mock("../../../utils/applyVars/applyVars");

describe("applyScopedFontVars", () => {
	const element = document.createElement("div");
	const mockVars = { "--text-sm": "clamp(...)" };

	beforeEach(() => {
		jest.clearAllMocks();
		(generateFontSizeVars as jest.Mock).mockReturnValue(mockVars);
	});

	it("applies font size variables to the provided element", () => {
		applyScopedFontVars({ postfix: "size", size: "sm", element });

		expect(generateFontSizeVars).toHaveBeenCalledWith("sm");
		expect(applyVars).toHaveBeenCalledWith(mockVars, element);
	});

	it("applies font family to --font-heading", () => {
		applyScopedFontVars({
			postfix: "heading",
			fontFamily: "Space Grotesk",
			element,
		});

		expect(applyVars).toHaveBeenCalledWith(
			{ "--font-heading": "Space Grotesk" },
			element
		);
	});

	it("does nothing if required inputs are missing", () => {
		applyScopedFontVars({ postfix: "size", element });

		expect(generateFontSizeVars).not.toHaveBeenCalled();
		expect(applyVars).not.toHaveBeenCalled();
	});
});
