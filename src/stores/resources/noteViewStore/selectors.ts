"use client"

import { useEffect } from "react";
import { useNoteViewStore, type ViewResource } from "@/stores/resources";
import { useShallow } from "zustand/shallow";

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
	}, [noteId, views.length, addView, hasHydrated, setActive]);

	return views;
}

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