import { lazy } from "react";
import capitalize from "lodash/capitalize";
import { noteMetas } from "./metaRegistry";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LazyMod = { default: React.ComponentType<any> };

export const notePanelModules = import.meta.glob<LazyMod>(
  "/src/components/menus/sidebar/NotesSidebar/**/*.tsx"
);

async function loadNotePanel(id: string): Promise<LazyMod> {
  const name = `${capitalize(id)}Panel.tsx`;
  const match = Object.keys(notePanelModules).find((p) => p.endsWith(`/panels/${name}`));
  if (!match) return { default: () => null };
  const importer = notePanelModules[match] as () => Promise<LazyMod>;
  const mod = await importer();
  return { default: mod.default };
}

export const defaultNotePanels = noteMetas.map((meta) => ({
  id: meta.id,
  title: meta.title,
  label: meta.title, // ✅ ensure label is present
  component: lazy(() => loadNotePanel(meta.id)),
}));
