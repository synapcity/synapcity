import type { Note } from "@/schemas/resources/note-schema";
import type { CombinedEditor } from "@/schemas/resources/view-schema";
import type { SearchableNoteItem } from "./types";

export function prepareNotesWithViews(
	notes: Note[],
	views: CombinedEditor[]
): SearchableNoteItem[] {
	const noteItems: SearchableNoteItem[] = notes.map((note) => ({
		id: note.id,
		parentNoteId: note.id,
		entityType: "note",
		title: note.title,
		summary: note.summary,
		tags: note.tags,
	}));

	const editorViews = views.filter(
		(v) => v.entity === "note" && v.type === "editor" && v.content
	);

	const viewItems: SearchableNoteItem[] = editorViews.map((view) => ({
		id: view.id,
		parentNoteId: view.entityId,
		entityType: "editorView",
		content: view.content,
		viewLabel: view.label,
	}));

	return [...noteItems, ...viewItems];
}
