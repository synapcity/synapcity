// import { z } from "zod";
// import { EntityBaseSchema } from "../base-schema";

// /**
//  * Full Note model — how it lives in your store.
//  */
// export const NoteSchema = EntityBaseSchema.extend({
// 	title: z.string().min(1, "Title is required"),
// 	summary: z.string().optional(),
// 	preview: z.string().optional(),
// 	tags: z.array(z.string()).optional(),
// 	icon: z.string().optional(),
// });
// export type Note = z.infer<typeof NoteSchema>;

// /**
//  * Only the fields your form edits.
//  */
// export const NoteFormSchema = NoteSchema.omit({
// 	id: true,
// 	createdAt: true,
// 	updatedAt: true,
// 	deletedAt: true,
// 	preview: true,
// }).extend({
// 	title: z.string().min(1, "Title is required"),
// 	summary: z.string().optional(),
// 	tags: z.array(z.string()).optional(),
// 	icon: z.string().optional(),
// });
// export type NoteForm = z.infer<typeof NoteFormSchema>;

// /**
//  * Factory to build a new Note, with defaults.
//  */
// export function createNote(partial: Partial<Note> = {}): Note {
// 	const now = new Date().toISOString();
// 	const base = {
// 		id: partial.id ?? crypto.randomUUID(),
// 		createdAt: partial.createdAt ?? now,
// 		updatedAt: partial.updatedAt ?? now,
// 		deletedAt: partial.deletedAt ?? null,
// 	};

// 	const note: Note = {
// 		...base,
// 		title: partial.title ?? "Untitled Note",
// 		summary: partial.summary ?? "",
// 		preview: partial.preview ?? "",
// 		tags: partial.tags ?? [],
// 		icon: partial.icon ?? "note",
// 	};

// 	return NoteSchema.parse(note);
// }
