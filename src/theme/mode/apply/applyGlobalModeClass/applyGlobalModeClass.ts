import { ThemeMode } from "@/theme/types";

export function applyGlobalModeClass(mode: ThemeMode) {
	const root = document.body;
	root.classList.remove("light", "dark");
	root.classList.add(mode);
}
