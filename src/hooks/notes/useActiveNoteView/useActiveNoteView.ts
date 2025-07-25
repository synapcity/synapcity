"use client";

import { useEffect, useState } from "react";
import { useNoteStore, useNoteViewStore } from "@/stores";
import { useNoteById } from "../useNoteViews";
import type { CombinedEditor, EditorView, ViewResource } from "@/schemas";
import { useSearchParams } from "next/navigation";

/**
 * Safely subscribes to the active note, its views, and the active view.
 */
export function useActiveNoteView() {
	const searchParams = useSearchParams();
	const tab = searchParams.get("tab");
	const note = searchParams.get("note");
	console.log("tab", tab, "note", note);

	const [activeNoteId, setActiveNoteId] = useState<string>(() => {
		return useNoteStore.getState().getSelected?.("note") ?? "";
	});

	useEffect(() => {
		// subscribe to selection changes
		const unsub = useNoteStore.subscribe((state) => state.selected?.note);
		setActiveNoteId(useNoteStore.getState().getSelected?.("note") ?? "");
		return unsub;
	}, []);

	// 2. Subscribe to all notes
	const [notes, setNotes] = useState(
		() => useNoteStore.getState().getAllResources?.() ?? []
	);
	useEffect(() => {
		const unsub = useNoteStore.subscribe(
			(state) => state.items
			// () => setNotes(useNoteStore.getState().getAllResources?.() ?? [])
		);
		setNotes(useNoteStore.getState().getAllResources?.() ?? []);
		return unsub;
	}, []);

	// 3. Subscribe to active note (object)
	const activeNote = useNoteById(activeNoteId);

	// 4. Subscribe to all views for this note
	const [views, setViews] = useState<ViewResource[]>(
		() => useNoteViewStore.getState().getViewsFor?.(activeNoteId) ?? []
	);
	useEffect(() => {
		const update = () =>
			setViews(useNoteViewStore.getState().getViewsFor?.(activeNoteId) ?? []);
		const unsub = useNoteViewStore.subscribe((state) => state.items);
		update();
		return unsub;
	}, [activeNoteId]);

	// 5. Subscribe to active view (object)
	const [activeView, setActiveView] = useState<EditorView | undefined>(
		undefined
	);
	useEffect(() => {
		const update = () => {
			const getActive = useNoteViewStore.getState().getActive;
			const getViewsFor = useNoteViewStore.getState().getViewsFor;
			const activeId = getActive?.(activeNoteId);
			const viewsForNote = (getViewsFor?.(activeNoteId) ??
				[]) as CombinedEditor[];
			const foundView = viewsForNote.find((view) => view.id === activeId);
			if (foundView) {
				setActiveView(foundView);
			}
		};
		const unsub = useNoteViewStore.subscribe((state) => [
			state.items,
			state.activeByScope,
		]);
		update();
		return unsub;
	}, [activeNoteId]);

	return {
		activeView,
		activeNote,
		notes,
		views,
	};
}
