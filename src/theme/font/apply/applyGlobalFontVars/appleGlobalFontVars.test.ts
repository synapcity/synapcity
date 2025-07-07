import { applyGlobalFontVars } from "../applyGlobalFontVars";
import { generateFontSizeVars } from "../../generate";
import { applyVars } from "../../../utils/applyVars/applyVars";

jest.mock("../../generate");
jest.mock("../../../utils/applyVars/applyVars");

describe("applyGlobalFontVars", () => {
	const mockVars = { "--text-md": "clamp(0.875rem, 1rem + 0.5vw, 1.125rem)" };

	beforeEach(() => {
		jest.clearAllMocks();
		(generateFontSizeVars as jest.Mock).mockReturnValue(mockVars);
	});

	it("applies font size variables to document.documentElement", () => {
		applyGlobalFontVars({ postfix: "size", size: "md" });

		expect(generateFontSizeVars).toHaveBeenCalledWith("md");
		expect(applyVars).toHaveBeenCalledWith(mockVars, document.body);
	});

	it("applies font family to --font-body", () => {
		applyGlobalFontVars({ postfix: "body", fontFamily: "Inter" });

		expect(applyVars).toHaveBeenCalledWith(
			{ "--font-body": "Inter" },
			document.body
		);
	});

	it("does nothing if size is missing for 'size' postfix", () => {
		applyGlobalFontVars({ postfix: "size" });

		expect(applyVars).not.toHaveBeenCalled();
		expect(generateFontSizeVars).not.toHaveBeenCalled();
	});
});
