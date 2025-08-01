import { CombinedEditor } from "@/schemas";
import { useNoteViewStore } from "@/stores";
import { NoteResource } from "@/types";

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
