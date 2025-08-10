export const applyVars = (vars: Record<string, string>, el: HTMLElement): void => {
  if (!el) return;
  Object.entries(vars).forEach(([key, value]) => {
    el.style.setProperty(key, value);
  });
};
