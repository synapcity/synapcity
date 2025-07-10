import { useContext } from "react";
import { ThemeContextType, ThemeContext } from "../theme-context";

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
};
