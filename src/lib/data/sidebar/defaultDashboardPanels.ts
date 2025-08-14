import { lazy } from "react";
import capitalize from "lodash/capitalize";
import { dashboardMetas } from "./metaRegistry";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LazyMod = { default: React.ComponentType<any> };

export const dashboardPanelModules = import.meta.glob<LazyMod>(
  "/src/components/menus/sidebar/DashboardSidebar/**/*.tsx"
);

async function loadDashPanel(id: string): Promise<LazyMod> {
  const name = `${capitalize(id)}Panel.tsx`;
  const match = Object.keys(dashboardPanelModules).find((p) => p.endsWith(`/panels/${name}`));
  if (!match) return { default: () => null };
  const importer = dashboardPanelModules[match] as () => Promise<LazyMod>;
  const mod = await importer();
  return { default: mod.default };
}

export const defaultDashboardPanels = dashboardMetas.map((meta) => ({
  id: meta.id,
  title: meta.title,
  label: meta.title, // ✅ ensure label is present
  component: lazy(() => loadDashPanel(meta.id)),
}));
