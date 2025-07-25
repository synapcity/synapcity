import { z } from "zod";

// 1. Base entity schema for createdAt, updatedAt, deletedAt
export const EntityBaseSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable(),
});
