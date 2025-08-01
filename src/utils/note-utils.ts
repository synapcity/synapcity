import { NoteLike } from "@/hooks/notes/useNotesSearchSort/useNotesSearchSort";
import { CombinedEditor } from "@/schemas";
import { useNoteViewStore } from "@/stores";
import { NoteResource } from "@/types";

export function getViewExcerpts(
	note: NoteLike,
	activeViewId: string | undefined,
	views: CombinedEditor[]
) {
	const view = views.find((v) => v.id === activeViewId);
	if (view) {
		return (view as CombinedEditor).content.trim() || "Start typing here...";
	}
	return note.excerpt || "Start typing here...";
}

export function aggregateViewContent(noteId: string) {
	const allViews = useNoteViewStore
		.getState()
		.getViewsFor(noteId) as CombinedEditor[];
	return allViews.map((v) => v.content || "").join(" ");
}

export function getExcerpt(note: NoteResource): string {
	const activeId = useNoteViewStore.getState().activeByScope[note.id];
	const views = useNoteViewStore
		.getState()
		.getViewsFor(note.id) as CombinedEditor[];
	const view = views.find((v) => v.id === activeId);
	if (view) {
		return (view as CombinedEditor).content.trim() || "Start typing here...";
	}
	return "Start typing here...";
}
