"use client";

import { useNoteStore, useNoteViewStore } from "@/stores/resources";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

// // import { useState, useEffect } from "react";
// // import { useNoteViewStore } from "@/stores/resources/noteViewStore/useNoteViewStore";
// // import type { View } from "@/stores/resources/noteViewStore/useNoteViewStore";
// // import { useShallow } from "zustand/shallow";
// // import { useSearchParams } from "next/navigation";
// // import { ViewResource } from "@/schemas";

// // export function useNoteActiveTab(noteId: string) {
// // 	const searchParams = useSearchParams();
// // 	const tabParam = searchParams.get("tab");
// // 	const setActive = useNoteViewStore((s) => s.setActive);
// // 	const activeById = useNoteViewStore(useShallow((s) => s.activeByScope));
// // 	const activeTabId = activeById[noteId];
// // 	const getTabs = useNoteViewStore((s) => s.getViewsFor);
// // 	const noteViews = getTabs(noteId);
// // 	const defaultTabId = activeTabId ?? noteViews[0]?.id ?? "";

// // 	useEffect(() => {
// // 		if (!noteId || !tabParam || !setActive) return;
// // 		if (!activeTabId && tabParam !== activeTabId) {
// // 			setActive(noteId, tabParam);
// // 		}
// // 	}, [activeTabId, noteId, noteViews, setActive, tabParam]);

// // 	useEffect(() => {
// // 		if (!noteId) return;
// // 		const url = new URL(window.location.href);
// // 		if (activeTabId) {
// // 			url.searchParams.set("tab", activeTabId);
// // 		} else {
// // 			setActive(noteId, defaultTabId);
// // 			url.searchParams.set("tab", defaultTabId);
// // 		}
// // 		window.history.replaceState(null, "", url.toString());
// // 	}, [noteId, activeTabId, setActive, defaultTabId]);

// // 	return {
// // 		activeTabId: activeTabId ?? defaultTabId,
// // 		activeTab: noteViews.find(
// // 			(view: ViewResource) =>
// // 				view.id === activeTabId || view.id === defaultTabId
// // 		),
// // 	};
// // }

// // export function useNoteViews(noteId: string) {
// // 	const [views, setViews] = useState<View[]>(
// // 		() => useNoteViewStore.getState().getViewsFor(noteId) ?? []
// // 	);

// // 	useEffect(() => {
// // 		const unsub = useNoteViewStore.subscribe((state) => {
// // 			const next = state.getViewsFor(noteId) ?? [];
// // 			setViews((prev) => (prev === next ? prev : next));
// // 		});
// // 		return unsub;
// // 	}, [noteId]);

// // 	return views;
// // }

// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { useNoteViewStore } from "@/stores/resources/noteViewStore/useNoteViewStore";
// // import type { View } from "@/stores/resources/noteViewStore/useNoteViewStore";
// // import type { ViewResource } from "@/schemas";
// import { subscribeWithSelector } from "zustand/middleware";

// // Helper to subscribe to a single key
// function subscribeToActiveTab(noteId: string, onChange: (activeTabId: string | undefined) => void) {
// 	return useNoteViewStore.subscribeWithSelector(
// 		(state) => state.activeByScope[noteId],
// 		onChange
// 	);
// }

// export function useNoteActiveTab(noteId: string) {
// 	const searchParams = useSearchParams();
// 	const tabParam = searchParams.get("tab");

// 	const getViewsFor = useNoteViewStore.getState().getViewsFor;
// 	const setActive = useNoteViewStore.getState().setActive;

// 	const views = useMemo(() => getViewsFor(noteId) ?? [], [noteId, getViewsFor]);
// 	const firstTabId = views[0]?.id ?? "";
// 	const [activeTabId, setActiveTabId] = useState<string | undefined>(
// 		() => useNoteViewStore.getState().activeByScope[noteId] ?? tabParam ?? firstTabId
// 	);

// 	// Subscribe to updates for the active tab
// 	useEffect(() => {
// 		const unsub = subscribeToActiveTab(noteId, (newId) => {
// 			setActiveTabId((prev) => (prev === newId ? prev : newId));
// 		});
// 		return unsub;
// 	}, [noteId]);

// 	// Sync tabParam to state
// 	useEffect(() => {
// 		if (!noteId || !tabParam) return;
// 		const current = useNoteViewStore.getState().activeByScope[noteId];
// 		if (!current && tabParam !== current) {
// 			setActive(noteId, tabParam);
// 		}
// 	}, [noteId, tabParam]);

// 	// Sync state to URL if missing
// 	useEffect(() => {
// 		if (!noteId || !activeTabId) return;
// 		const url = new URL(window.location.href);
// 		const currentTab = url.searchParams.get("tab");

// 		if (currentTab !== activeTabId) {
// 			url.searchParams.set("tab", activeTabId);
// 			window.history.replaceState(null, "", url.toString());
// 		}
// 	}, [noteId, activeTabId]);

// 	const activeTab = useMemo(
// 		() => views.find((view) => view.id === activeTabId) ?? views.find((v) => v.id === firstTabId),
// 		[views, activeTabId, firstTabId]
// 	);

// 	return {
// 		activeTabId: activeTabId ?? firstTabId,
// 		activeTab,
// 	};
// }

// export function useNoteViews(noteId: string): View[] {
// 	const [views, setViews] = useState<View[]>(
// 		() => useNoteViewStore.getState().getViewsFor(noteId) ?? []
// 	);

// 	useEffect(() => {
// 		const unsub = useNoteViewStore.subscribe(
// 			(state) => state.getViewsFor(noteId),
// 			(next) => {
// 				setViews((prev) => (prev === next ? prev : next));
// 			}
// 		);
// 		return unsub;
// 	}, [noteId]);

// 	return views;
// }
// export function useNoteViews(noteId: string) {
// 	const [views, setViews] = useState(
// 		() => useNoteViewStore.getState().getViewsFor(noteId) ?? []
// 	);

// 	useEffect(() => {
// 		const unsub = useNoteViewStore.subscribe(
// 			(state) => state.items
// 			() => {
// 				const updated = useNoteViewStore.getState().getViewsFor(noteId) ?? [];
// 				setViews(updated);
// 			}
// 		);
// 		return unsub;
// 	}, [noteId]);

// 	return views;
// }
export function subscribeToActiveTab(
	noteId: string,
	onChange: (activeTabId: string | undefined) => void
) {
	return useNoteViewStore.subscribe(
		(state) => state.activeByScope[noteId],
		onChange,
		{ equalityFn: Object.is }
	);
}

export function useNoteViews(noteId: string) {
	const [views, setViews] = useState(() => {
		return useNoteViewStore.getState().getViewsFor(noteId) ?? [];
	});

	useEffect(() => {
		const unsubscribe = useNoteViewStore.subscribe(
			(state) => state.items, // subscribe to the whole items map
			() => {
				const updated = useNoteViewStore.getState().getViewsFor(noteId) ?? [];
				setViews(updated);
			},
			{ equalityFn: Object.is } // optional: avoids double-calling
		);
		return unsubscribe;
	}, [noteId]);

	return views;
}

export function useNoteById(noteId: string) {
	const [note, setNote] = useState(() => useNoteStore.getState().items[noteId]);

	useEffect(() => {
		const unsub = useNoteStore.subscribe(
			(state) => state.items[noteId],
			(newNote) => {
				setNote(newNote);
			}
		);
		return unsub;
	}, [noteId]);

	return note;
}

export function useNoteActiveTab(noteId: string) {
	const searchParams = useSearchParams();
	const tabParam = searchParams.get("tab");

	const views = useNoteViews(noteId);
	const firstTabId = views[0]?.id ?? "";

	const setActive = useNoteViewStore((s) => s.setActive);
	const activeTabId = useNoteViewStore((s) => s.activeByScope[noteId]);

	useEffect(() => {
		if (!noteId || !tabParam) return;
		if (!activeTabId && tabParam !== activeTabId) {
			setActive(noteId, tabParam);
		}
	}, [noteId, tabParam, activeTabId, setActive]);

	useEffect(() => {
		if (!noteId || !activeTabId) return;
		const url = new URL(window.location.href);
		const currentTab = url.searchParams.get("tab");

		if (currentTab !== activeTabId) {
			url.searchParams.set("tab", activeTabId);
			window.history.replaceState(null, "", url.toString());
		}
	}, [noteId, activeTabId]);

	const activeTab = useMemo(
		() => views.find((view) => view.id === activeTabId) ?? views[0],
		[views, activeTabId]
	);

	return {
		activeTabId: activeTabId ?? firstTabId,
		activeTab,
	};
}
