import type { ThemeMode } from "@/theme/types";

export function applyGlobalModeVars(mode: ThemeMode) {
	const root = document.body;
	root.classList.remove("light", "dark");
	root.classList.add(mode);
}

export function applyScopedModeVars(mode: ThemeMode, el: HTMLElement) {
	el.classList.remove("light", "dark");
	el.classList.add(mode);
	el.dataset.theme = mode;
}
