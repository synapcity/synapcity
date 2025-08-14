// src/lib/data/sidebar/defaultNotePanels.ts
import { lazy } from "react";
import capitalize from "lodash/capitalize";
import { noteMetas } from "./metaRegistry";

// Let Vite discover the files at build time
const notePanelModules = import.meta.glob(
  "/src/components/menus/sidebar/NotesSidebar/panels/*Panel.tsx"
);

function loadNotePanel(id: string) {
  const name = `${capitalize(id)}Panel.tsx`;
  const entry = Object.entries(notePanelModules).find(([p]) => p.endsWith(`/panels/${name}`));
  if (!entry) {
    // return a harmless null component instead of crashing SB
    return Promise.resolve({ default: () => null });
  }
  return entry[1]().then((m) => ({ default: m.default }));
}

export const defaultNotePanels = noteMetas.map((meta) => ({
  id: meta.id,
  title: meta.title,
  component: lazy(() => loadNotePanel(meta.id)),
}));
