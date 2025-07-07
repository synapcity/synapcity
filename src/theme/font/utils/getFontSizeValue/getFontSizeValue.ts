import { FontSizeToken } from "@/theme/font/types";

export function getFontSizeValue(token: FontSizeToken): string {
	switch (token) {
		case "xs":
			return "0.75rem";
		case "sm":
			return "0.875rem";
		case "md":
			return "1rem";
		case "lg":
			return "1.125rem";
		case "xl":
			return "1.25rem";
		case "2xl":
			return "1.5rem";
		case "3xl":
			return "1.875rem";
		case "4xl":
			return "2.25rem";
		case "5xl":
			return "3rem";
		case "6xl":
			return "3.75rem";
		case "7xl":
			return "4.5rem";
		case "8xl":
			return "6rem";
		case "9xl":
			return "8rem";
		default:
			return "1rem";
	}
}
