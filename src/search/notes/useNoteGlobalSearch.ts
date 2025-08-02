"use client";
import { useMemo } from "react";
import Fuse from "fuse.js";
import { prepareNotesWithViews } from "./prepareNotesWithViews";
import { noteSearchOptions } from "./noteConfig";
import type { Note } from "@/schemas/resources/note-schema";
import type { CombinedEditor } from "@/schemas/resources/view-schema";
import type { NoteSearchResult } from "./types";

/**
 * Returns Fuse.js results for all notes (titles, tags, summary) AND their editor views (content/label).
 */
export function useNoteGlobalSearch(
	notes: Note[],
	views: CombinedEditor[],
	query: string
): NoteSearchResult[] {
	const searchItems = useMemo(
		() => prepareNotesWithViews(notes, views),
		[notes, views]
	);
	const fuse = useMemo(
		() => new Fuse(searchItems, noteSearchOptions),
		[searchItems]
	);

	return useMemo(() => {
		if (!query.trim()) return [];
		return fuse.search(query);
	}, [fuse, query]);
}
