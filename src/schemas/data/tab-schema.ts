import { z } from "zod";

export const TabEntityTypeSchema = z.enum([
	"todo",
	"note",
	"list",
	"dashboard",
]);
export type TabEntityType = z.infer<typeof TabEntityTypeSchema>;

export const BaseEntitySchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable(),
});

export const BaseTabSchema = z.object({
	label: z.string(),
	value: z.string(),
	icon: z.string().optional(),
});

export type BaseTab = z.infer<typeof BaseTabSchema>;

export const TabSchema = BaseEntitySchema.extend({
	...BaseTabSchema.shape,
	entity: TabEntityTypeSchema,
	entityId: z.string(),
	type: z.enum(["editor", "code", "image", "custom"]).or(z.string()),
	content: z.string(),
	editorState: z.string(),
	color: z.string().nullable().optional(),
	component: z.string().nullable().optional(),
	isDefault: z.boolean().optional(),
});

export type Tab = z.infer<typeof TabSchema>;

export const TabFormSchema = TabSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
}).pick({
	label: true,
	value: true,
	icon: true,
	entity: true,
	entityId: true,
	type: true,
	content: true,
	color: true,
	component: true,
	isDefault: true,
	editorState: true,
});

export type TabForm = z.infer<typeof TabFormSchema>;

export const TabStateSchema = z.object({
	activeTabIdByEntity: z.record(
		TabEntityTypeSchema,
		z.record(z.string(), z.string().nullable())
	),
	dirtyTabIds: z.array(z.string()),
	tabs: z.record(
		TabEntityTypeSchema,
		z.record(z.string(), z.record(z.string(), TabSchema))
	),
});
export type TabState = z.infer<typeof TabStateSchema>;

// Validation on hydration:
// const persisted = JSON.parse(localStorage.getItem("tabs-store") || "{}");
// const good: TabState = TabStateSchema.parse(persisted);

// Form-side Validation:
