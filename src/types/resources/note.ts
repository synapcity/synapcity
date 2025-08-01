import { z } from "zod";
import { ResourceSchema } from "@/schemas/resources/base-schema";

// 1️⃣ Define the fields unique to your Note
export const NoteDataSchema = z.object({
	title: z.string().min(1, "Title is required"),
	summary: z.string().optional(),
	tags: z.array(z.string()).optional(),
	icon: z.string().optional(),
});

// 2️⃣ Merge with the base (id/createdAt/updatedAt/deletedAt)
export const NoteResourceSchema = ResourceSchema(NoteDataSchema);
export type NoteResource = z.infer<typeof NoteResourceSchema>;
