import { lazy } from "react";
import capitalize from "lodash/capitalize";
import { dashboardMetas } from "./metaRegistry";

// Let Vite discover the files at build time
const dashboardPanelModules = import.meta.glob(
  "/src/components/menus/sidebar/DashboardsSidebar/panels/*Panel.tsx"
);

function loadDashPanel(id: string) {
  const name = `${capitalize(id)}Panel.tsx`;
  const entry = Object.entries(dashboardPanelModules).find(([p]) => p.endsWith(`/panels/${name}`));
  if (!entry) {
    // return a harmless null component instead of crashing SB
    return Promise.resolve({ default: () => null });
  }
  return entry[1]().then((m) => ({ default: m.default }));
}

export const defaultDashboardPanels = dashboardMetas.map((meta) => ({
  id: meta.id,
  title: meta.title,
  component: lazy(() => loadDashPanel(meta.id)),
}));
