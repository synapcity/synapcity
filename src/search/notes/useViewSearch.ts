"use client";

import Fuse from "fuse.js";
import { useMemo } from "react";
import type { CombinedEditor } from "@/schemas/resources/view-schema";
import type { NoteSearchResult } from "./types";
import { viewSearchOptions } from "./noteSearchOptions";
import { prepareViews } from "./prepareNotesWithViews";


export function useViewSearch(
  views: CombinedEditor[],
  query: string
): NoteSearchResult[] {
  const searchItems = useMemo(
    () => prepareViews(views),
    [views]
  );

const fuse = useMemo(() => new Fuse(searchItems, viewSearchOptions), [searchItems]);


  return useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query);
  }, [fuse, query]);
}
