import { create } from 'zustand';

interface EditorState {
  isDirty: boolean;
  lastSavedAt: string | null;
  isSaving: boolean;
  setDirty: (dirty: boolean) => void;
  setLastSaved: (iso: string) => void;
  setSaving: (saving: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  isDirty: false,
  lastSavedAt: null,
  isSaving: false,
  setDirty: (dirty) => set({ isDirty: dirty }),
  setLastSaved: (iso) => set({ lastSavedAt: iso }),
  setSaving: (saving) => set({ isSaving: saving }),
}));

