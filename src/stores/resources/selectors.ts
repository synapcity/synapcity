import { useNoteStore } from "./noteStore";
import { useNoteViewStore } from "./noteViewStore";

export const useNoteById = (id: string) => useNoteStore((s) => s.items[id]);

export const useNoteViewsByNoteId = (noteId: string) =>
	useNoteViewStore((s) => s.getViewsFor(noteId));
