import { ThemeMode } from "@/theme/types";

export function applyScopedModeClass(mode: ThemeMode, el: HTMLElement) {
	el.classList.remove("light", "dark");
	el.classList.add(mode);
}
