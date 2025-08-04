"use client";

import Fuse from "fuse.js";
import { useMemo } from "react";
import type { Note } from "@/schemas/resources/note-schema";
import type { NoteSearchResult } from "./types";
import { noteSearchOptions } from "./noteSearchOptions";
import { prepareNotes } from "./prepareNotesWithViews";

export function useNoteSearch(
  notes: Note[],
  query: string
): NoteSearchResult[] {
  const searchItems = useMemo(
    () =>
      prepareNotes(notes),
    [notes]
  );

const fuse = useMemo(() => new Fuse(searchItems, noteSearchOptions), [searchItems]);


  return useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query);
  }, [fuse, query]);
}