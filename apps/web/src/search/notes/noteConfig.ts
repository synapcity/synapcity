import type { SearchableNoteItem } from "./types";
import { IFuseOptions } from "fuse.js";

export const noteSearchOptions: IFuseOptions<SearchableNoteItem> = {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "summary", weight: 0.2 },
    { name: "tags", weight: 0.2 },
    { name: "content", weight: 0.7 },
    { name: "viewLabel", weight: 0.2 },
  ],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
};
