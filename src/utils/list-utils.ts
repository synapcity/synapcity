/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListSchema, type List } from "@/schemas/data/list-schema";
import {
	NoteDataSchema as NoteSchema,
	RawNote,
} from "@/schemas/resources/note-schema";

/**
 * Load and validate all lists from JSON.
 */
export function loadLists(rawLists: any): List[] {
	// rawLists is typed as any[], so we validate each entry
	return (rawLists as unknown[]).map((raw) => ListSchema.parse(raw));
}

/**
 * Find a single list by ID, or throw if not found
 */
export function getListById(id: string, rawLists: any): List {
	const lists = loadLists(rawLists);
	const list = lists.find((l) => l.id === id);
	if (!list) throw new Error(`List not found: ${id}`);
	return list;
}

export function loadNotes(rawNotes: any): RawNote[] {
	return (rawNotes as unknown[]).map((raw) => NoteSchema.parse(raw));
}
