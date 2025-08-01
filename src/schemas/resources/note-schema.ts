import { z } from "zod";
import { ResourceSchema } from "./base-schema";

export const NoteDataSchema = z.object({
	title: z.string().min(1, "Title is required"),
	summary: z.string().optional(),
	tags: z.array(z.string()).optional(),
	icon: z.string().optional(),
});

export const NoteResourceSchema = ResourceSchema(NoteDataSchema);
export type Note = z.infer<typeof NoteResourceSchema>;

export type RawNote = z.infer<typeof NoteDataSchema>;

export function createNote(partial: Partial<Note> = {}): Note {
	const now = new Date().toISOString();
	const base = {
		id: partial.id || crypto.randomUUID(),
		createdAt: partial.createdAt || now,
		updatedAt: partial.updatedAt || now,
		deletedAt: partial.deletedAt ?? null,
	};

	const note = {
		...base,
		title: partial.title || "Untitled",
		summary: partial.summary || "",
		tags: partial.tags || [],
		icon: partial.icon || "Note",
	};

	return NoteResourceSchema.parse(note);
}
