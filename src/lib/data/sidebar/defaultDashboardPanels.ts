import { safeViteGlob } from "@/utils/safeViteGlob";
import type { SidebarPrefs } from "@/stores/ui/sidebarStore/types";

const modules = safeViteGlob<SidebarPrefs>("./dashboard-panels/**/*.tsx", { eager: true });

export const defaultDashboardPanels: SidebarPrefs[] = Object.values(modules)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .map((loader: any) => loader?.default)
  .filter(Boolean);

// async function loadDashPanel(id: string): Promise<LazyMod> {
//   const name = `${capitalize(id)}Panel.tsx`;
//   const match = Object.keys(dashboardPanelModules).find((p) => p.endsWith(`/panels/${name}`));
//   if (!match) return { default: () => null };
//   const importer = dashboardPanelModules[match] as () => Promise<LazyMod>;
//   const mod = await importer();
//   return { default: mod.default };
// }

// export const defaultDashboardPanels = dashboardMetas.map((meta) => ({
//   id: meta.id,
//   title: meta.title,
//   label: meta.title, // ✅ ensure label is present
//   component: lazy(() => loadDashPanel(meta.id)),
// }));
