import { create } from "zustand";

export type NoteTemplate = {
  id: string;
  name: string;
  content: string;
  icon?: string;
  color?: string;
};

type State = {
  templates: NoteTemplate[];
  addTemplate: (tpl: Omit<NoteTemplate, "id">) => void;
  updateTemplate: (id: string, partial: Partial<NoteTemplate>) => void;
  deleteTemplate: (id: string) => void;
};

export const useTemplateStore = create<State>((set) => ({
  templates: [
    {
      id: "standup",
      name: "Daily Standup",
      content: "- Yesterday:\n- Today:\n- Blockers:",
      icon: "☀️",
    },
    {
      id: "interview",
      name: "Interview Prep",
      content: "## About the company\n\n## My questions\n- \n\n## Notes\n- ",
      icon: "🎤",
    },
  ],
  addTemplate: (tpl) =>
    set((s) => ({
      templates: [...s.templates, { ...tpl, id: Math.random().toString(36).slice(2) }],
    })),
  updateTemplate: (id, partial) =>
    set((s) => ({
      templates: s.templates.map((t) => (t.id === id ? { ...t, ...partial } : t)),
    })),
  deleteTemplate: (id) => set((s) => ({ templates: s.templates.filter((t) => t.id !== id) })),
}));
