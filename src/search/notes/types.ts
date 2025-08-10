import { FuseResultMatch } from "fuse.js";

export type SearchEntityType = "note" | "editorView";

export interface SearchableNoteItem {
  id: string;
  parentNoteId: string;
  entityType: SearchEntityType;
  title?: string;
  summary?: string;
  tags?: string[];
  content?: string;
  viewLabel?: string;
}

export interface NoteSearchResult {
  item: SearchableNoteItem;
  score?: number;
  matches?: readonly FuseResultMatch[];
}
