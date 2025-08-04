import type { Note } from "@/schemas/resources/note-schema";
import type { CombinedEditor } from "@/schemas/resources/view-schema";
import type { SearchableNoteItem, SearchEntityType } from "./types";

export function prepareNotes(notes: Note[]){
	return notes.map((note) => ({
		id: note.id,
		parentNoteId: note.id,
		entityType: "note" as SearchEntityType,
		title: note.title,
		summary: note.summary,
		tags: note.tags,
	}));
}

export function prepareViews(views: CombinedEditor[]){
		const editorViews = views.filter(
		(v) => v.entity === "note" && v.type === "editor" && v.content
	);

	return editorViews.map((view) => ({
		id: view.id,
		parentNoteId: view.entityId,
		entityType: "editorView" as SearchEntityType,
		content: view.content,
		viewLabel: view.label,
	}));
}

export function prepareNotesWithViews(
	notes: Note[],
	views: CombinedEditor[]
): SearchableNoteItem[] {

	const noteItems = prepareNotes(notes)
	const viewItems = prepareViews(views)

	return [...noteItems, ...viewItems]
}
