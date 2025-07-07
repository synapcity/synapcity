jest.mock("@/theme/generateCss", () => ({
	...jest.requireActual("@/theme/generateCss"),
	generateFontSizeVars: jest.fn(),
}));
jest.mock("@/theme/applyCss", () => ({
	...jest.requireActual("@/theme/applyCss"),
	applyVars: jest.fn(),
	applyGlobalFontVars: jest.fn(),
	applyScopedFontVars: jest.fn(),
}));

import { applyGlobalFontVars, applyScopedFontVars } from "./applyFontVars";
import { generateFontSizeVars } from "@/theme/generateCss";
import { applyVars } from "@/theme/applyCss";

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
