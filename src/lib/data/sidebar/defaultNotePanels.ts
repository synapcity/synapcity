import type { SidebarPrefs } from "@/stores/ui/sidebarStore/types";
import { safeViteGlob } from "@/utils/safeViteGlob";

const modules = safeViteGlob<SidebarPrefs>("./note-panels/**/*.tsx", { eager: true });

// however you were building the array before:
export const defaultNotePanels: SidebarPrefs[] = Object.values(modules)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .map((loader: any) => loader?.default)
  .filter(Boolean);

export default defaultNotePanels;

// import React, { lazy } from "react";
// import capitalize from "lodash/capitalize";
// import { noteMetas } from "./metaRegistry";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// type LazyMod = { default: React.ComponentType<any> };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const globFn = (typeof import.meta !== "undefined" && (import.meta as any)?.glob) as
//   | (<T = unknown>(pattern: string) => Record<string, () => Promise<T>>)
//   | undefined;

// export const notePanelModules: Record<string, () => Promise<LazyMod>> = globFn
//   ? globFn<LazyMod>("/src/components/menus/sidebar/NotesSidebar/**/*.tsx")
//   : {};

// async function loadNotePanel(id: string): Promise<LazyMod> {
//   const name = `${capitalize(id)}Panel.tsx`;
//   const match = Object.keys(notePanelModules).find((p) => p.endsWith(`/panels/${name}`));
//   if (!match) return { default: () => null };
//   const importer = notePanelModules[match] as () => Promise<LazyMod>;
//   const mod = await importer();
//   return { default: mod.default };
// }

// export const defaultNotePanels = noteMetas.map((meta) => ({
//   id: meta.id,
//   title: meta.title,
//   label: meta.title, // ✅ ensure label is present
//   component: lazy(() => loadNotePanel(meta.id)),
// }));
