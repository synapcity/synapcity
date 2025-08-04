import type { IFuseOptions } from "fuse.js";
import type { SearchableNoteItem } from "./types";

export const noteSearchOptions: IFuseOptions<SearchableNoteItem> = {
  keys: [
    { name: "title", weight: 0.6 },
    { name: "summary", weight: 0.6 },
    { name: "tags", weight: 0.6 },
  ],
  threshold: 0.5,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
};

export const viewSearchOptions: IFuseOptions<SearchableNoteItem> = {
  keys: [
    { name: "content", weight: 0.7 },
    { name: "viewLabel", weight: 0.5},
  ],
  threshold: 0.5,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
};
