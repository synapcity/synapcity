import { useEffect } from "react";
import { useNoteViewStore } from "@/stores/resources";
import type { ViewResource } from "@/schemas/resources";
import { useShallow } from "zustand/shallow";

/**
 * Always returns an array of views for `noteId`.
 * If none exist yet, auto‑adds a new "editor" view.
 */
export function useNoteViewsByNoteId(noteId: string): ViewResource[] {
	const views = useNoteViewStore(
		useShallow((s) => s.getViewsFor(noteId) ?? [])
	);
	const setActive = useNoteViewStore((s) => s.setActive);
	const addView = useNoteViewStore((s) => s.addView);
	const hasHydrated = useNoteViewStore((s) => s.hasHydrated);
	useEffect(() => {
		if (!hasHydrated) return;
		if (views.length === 0 && noteId) {
			const view = addView(noteId, "editor");
			setActive(noteId, view.id);
		}
	}, [noteId, views.length, addView, hasHydrated]);

	return views;
}

/**
 * Returns the active ViewResource for a note.
 * Priority:
 *  1) store.activeByScope[noteId]
 *  2) passed-in preferredViewId
 *  3) view in views[] with isDefault===true
 *  4) first view in array
 *
 * Also writes back into the store if we fell back to (3) or (4).
 */
export function useNoteActiveView(
	noteId: string,
	preferredViewId?: string
): ViewResource | undefined {
	const views = useNoteViewsByNoteId(noteId);
	const defaultView = views.find((v) => v.isDefault) ?? views[0];
	const activeByScope = useNoteViewStore(useShallow((s) => s.activeByScope));
	const activeId = activeByScope[noteId] ?? preferredViewId ?? defaultView?.id;

	return useNoteViewStore(
		useShallow(
			(s) =>
				(s.getViewsFor(noteId) ?? []).find(
					(v: ViewResource) => v.id === activeId
				) ?? defaultView
		)
	);
}
