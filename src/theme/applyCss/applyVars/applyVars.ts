export const applyVars = (
	vars: Record<string, string>,
	el: HTMLElement
): void => {
	Object.entries(vars).forEach(([key, value]) => {
		el.style.setProperty(key, value);
	});
};
