// import { z } from "zod";
// import { EntityBaseSchema } from "./base-schema";
// import { Note } from "@/types/note";

// // this is your full internal model:
// export const NoteSchema = EntityBaseSchema.extend({
// 	title: z.string().min(1, "Title is required"),
// 	summary: z.string().optional(),
// 	preview: z.string().optional(),
// 	tags: z.array(z.string()).optional(),
// 	icon: z.string().optional(),
// });

// // this is _only_ the bits the user can edit:
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

// // 2. Factory to create a new Note with defaults and validation
// export function createNote(partial: Partial<Note> = {}): Note {
// 	const now = new Date().toISOString();
// 	const base = {
// 		id: partial.id || crypto.randomUUID(),
// 		createdAt: partial.createdAt || now,
// 		updatedAt: partial.updatedAt || now,
// 		deletedAt: partial.deletedAt ?? null,
// 	};

// 	const note = {
// 		...base,
// 		title: partial.title || "Untitled",
// 		summary: partial.summary || "",
// 		preview: partial.preview || "",
// 		tags: partial.tags || [],
// 		icon: partial.icon || "Note",
// 	};

// 	return NoteSchema.parse(note);
// }
