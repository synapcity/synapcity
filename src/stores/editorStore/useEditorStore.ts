import { create } from "zustand";
import { createStatusSlice, type StatusSlice } from "@/stores/slices";
import type { LexicalEditor } from "lexical";

export type EditorStore = {
  editors: Record<string, LexicalEditor>;
  activeEditorId: string | null;
  clipboard: { content: string | null; sourceEditorId: string | null };
} & StatusSlice & {
    registerEditor: (id: string, editor: LexicalEditor) => void;
    unregisterEditor: (id: string) => void;
    setActiveEditorId: (id: string | null) => void;
    copyToClipboard: (content: string, sourceEditorId: string) => void;
    pasteFromClipboard: (targetEditorId: string) => void;
  };

export const useEditorStore = create<EditorStore>((set, get, store) => ({
  editors: {},
  activeEditorId: null,
  clipboard: { content: null, sourceEditorId: null },

  registerEditor: (id, editor) =>
    set((s) => ({
      editors: { ...s.editors, [id]: editor },
      activeEditorId: id,
    })),

  unregisterEditor: (id) =>
    set((s) => {
      const { [id]: _, ...rest } = s.editors;
      return {
        editors: rest,
        activeEditorId: s.activeEditorId === id ? null : s.activeEditorId,
      };
    }),

  setActiveEditorId: (id) => set({ activeEditorId: id }),

  copyToClipboard: (content, sourceEditorId) => set({ clipboard: { content, sourceEditorId } }),

  pasteFromClipboard: (targetEditorId) => {
    const { editors, clipboard } = get();
    const editor = editors[targetEditorId];
    if (editor && clipboard.content) {
      editor.update(() => {
        const state = editor.parseEditorState(JSON.parse(clipboard.content!));
        editor.setEditorState(state);
      });
    }
  },

  ...createStatusSlice(set, get, store),
}));
