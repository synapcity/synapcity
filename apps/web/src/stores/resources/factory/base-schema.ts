import { z } from "zod";

/**
 * Zod schema for the base fields included in every resource.
 */
export const BaseResourceSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const BaseEntitySchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

/**
 * TypeScript type for base resource fields, inferred from BaseResourceSchema.
 */
export type BaseResource = z.infer<typeof BaseResourceSchema>;

/**
 * Generic resource type combining custom data with base fields.
 *
 * Example usage:
 *   const NoteDataSchema = z.object({ title: z.string(), content: z.string(), notebookId: z.string() });
 *   type NoteResource = Resource<z.infer<typeof NoteDataSchema>>;
 */
export type Resource<T extends object> = T & BaseResource;

/**
 * Utility to build a Zod schema for a full "resource" by merging a data schema with BaseResourceSchema.
 *
 * Example:
 *   import { z } from "zod";
 *   import { ResourceSchema } from "@/schemas/base-schema";
 *
 *   const NoteDataSchema = z.object({
 *     title: z.string(),
 *     content: z.string(),
 *     notebookId: z.string(),
 *   });
 *   export const NoteResourceSchema = ResourceSchema(NoteDataSchema);
 *   export type NoteResource = z.infer<typeof NoteResourceSchema>;
 */
export function ResourceSchema<T extends z.ZodTypeAny>(
  dataSchema: T
): z.ZodIntersection<T, typeof BaseResourceSchema> {
  return z.intersection(dataSchema, BaseResourceSchema);
}
