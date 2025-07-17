import { useUIStore } from "@/stores/uiStore";
import { useNotesStore } from "./useNotesStore";

export const useNote = (id: string) => useNotesStore((s) => s.getItemById(id));
export const useAllNotes = () => useNotesStore((s) => Object.values(s.items));
export const useSelectedNote = () => {
	const id = useUIStore((s) => s.getSelected?.("note"));
	return useNotesStore((s) => (id ? s.getItemById(id) : undefined));
};
export const useNoteStatusFlags = (id: string) => {
	const st = useUIStore((s) => s.getStatus("note", id));
	return {
		isSaving: st.isSaving,
		isLoading: st.isLoading,
		isDirty: st.isEditing || st.isDeleting || st.isSearching,
		error: st.error,
		lastSavedAt: st.lastSavedAt,
	};
};
