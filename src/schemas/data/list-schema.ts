// import { z } from "zod";
// import { TodoStatusSchema, TodoItemSchema } from "./todo-schema";

// export const ListConfigSchema = z.object({
// 	itemOrder: z.array(z.string()).optional(),
// 	itemsPerPage: z.number().optional(),
// 	defaultSort: z.string().optional(),
// 	defaultFilter: z
// 		.object({
// 			status: TodoStatusSchema.optional(),
// 			search: z.string().optional(),
// 		})
// 		.optional(),
// 	defaultView: z.enum(["list", "board", "calendar"]).optional(),
// });

// export const ListMetaSchema = z.object({
// 	sortBy: z.string(),
// 	sortOrder: z.enum(["asc", "desc"]),
// 	selectedId: z.string().nullable(),
// 	batchSelectedIds: z.array(z.string()),
// 	parentId: z.string().optional(),
// 	parentType: z.string().optional(),
// });

// export const ListSchema = z.object({
// 	id: z.string(),
// 	name: z.string().optional(),
// 	type: z.string(),
// 	description: z.string().optional(),
// 	tags: z.array(z.string()).optional(),
// 	theme: z.object({ icon: z.string().optional() }).passthrough().optional(),
// 	config: ListConfigSchema,
// 	items: z.array(TodoItemSchema),
// 	meta: ListMetaSchema,
// });

// export type List = z.infer<typeof ListSchema>;

import { z } from "zod";
import { EntityBaseSchema } from "./base-schema";
import { TodoItemSchema, TodoStatusSchema } from "./todo-schema";

// 1. Config schema for list settings
export const ListConfigSchema = z.object({
	itemOrder: z.array(z.string()).optional(),
	itemsPerPage: z.number().optional(),
	defaultSort: z.string().optional(),
	defaultFilter: z
		.object({
			status: TodoStatusSchema.optional(),
			search: z.string().optional(),
		})
		.optional(),
	defaultView: z.enum(["list", "board", "calendar"]).optional(),
});

// 2. UI metadata schema (ephemeral state)
export const ListMetaSchema = z.object({
	sortBy: z.string(), // typically a key of item
	sortOrder: z.enum(["asc", "desc"]),
	selectedId: z.string().nullable(),
	batchSelectedIds: z.array(z.string()),
	parentId: z.string().optional(),
	parentType: z.string().optional(),
});

export type TodoItem = z.infer<typeof TodoItemSchema>;

// 3. Complete List schema (extends BaseEntity + includes nested items)
export const ListSchema = EntityBaseSchema.extend({
	name: z.string().optional(),
	type: z.string(),
	description: z.string().optional(),
	tags: z.array(z.string()).optional(),
	theme: z.object({ icon: z.string().optional() }).passthrough().optional(),
	config: ListConfigSchema.optional(),
	items: z.array(TodoItemSchema),
	meta: ListMetaSchema,
});
export type List = z.infer<typeof ListSchema>;

// 4. Factory to create a new List with defaults and validation
export function createList(partial: Partial<List> = {}): List {
	const now = new Date().toISOString();
	const base = {
		id: partial.id || crypto.randomUUID(),
		createdAt: partial.createdAt || now,
		updatedAt: partial.updatedAt || now,
		deletedAt: partial.deletedAt ?? null,
	};

	// merge defaults for nested objects
	const list = {
		...base,
		name: partial.name ?? "",
		type: partial.type ?? "todo",
		description: partial.description ?? "",
		tags: partial.tags ?? [],
		theme: partial.theme ?? {},
		config: partial.config ?? {},
		items: partial.items ?? [],
		meta: {
			sortBy: partial.meta?.sortBy || "createdAt",
			sortOrder: partial.meta?.sortOrder || "asc",
			selectedId: partial.meta?.selectedId || null,
			batchSelectedIds: partial.meta?.batchSelectedIds || [],
			parentId: partial.meta?.parentId,
			parentType: partial.meta?.parentType,
		},
	};

	// validate and return
	return ListSchema.parse(list);
}
