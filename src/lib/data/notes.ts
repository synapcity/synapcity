import type { Note } from "@/stores/resources/noteStore/note-schema";
import notes from "@/stores/resources/noteStore/notes.json";

/**
 * Provides the initial note data used to hydrate the note store.
 */
export function getNoteData(): Note[] {
  return notes as Note[];
}
