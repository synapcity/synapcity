// import { z } from "zod";
// import { EntityBaseSchema } from "../resources/base-schema";

// /** which thing this tab belongs to */
// export const TabEntityTypeSchema = z.enum(["note"]);
// export type TabEntityType = z.infer<typeof TabEntityTypeSchema>;

// /** your full Tab model */
// export const TabSchema = EntityBaseSchema.extend({
// 	entity: TabEntityTypeSchema.default("note"),
// 	entityId: z.string().default("__missing_entityId__"),
// 	type: z.enum(["editor", "code", "gallery"]).default("editor"),
// 	label: z.string().default("New Tab"),
// 	content: z.union([z.string(), z.array(z.string())]).default(""),
// 	icon: z.string().default("note"),
// 	color: z.string().nullable().default(null),
// 	component: z.string().nullable().default(null),
// 	isDefault: z.boolean().default(false),
// 	language: z.string().optional().default("en"),
// });

// export type Tab = z.infer<typeof TabSchema>;

// /** Factory to create a new Tab with defaults */
// export function createTab(
// 	partial: Partial<Tab> & { entity: TabEntityType; entityId: string }
// ): Tab {
// 	const now = new Date().toISOString();
// 	const base = {
// 		id: partial.id ?? crypto.randomUUID(),
// 		createdAt: partial.createdAt ?? now,
// 		updatedAt: partial.updatedAt ?? now,
// 		deletedAt: partial.deletedAt ?? null,
// 	};

// 	const tab = {
// 		...base,
// 		entity: partial.entity,
// 		entityId: partial.entityId,
// 		type: partial.type ?? "editor",
// 		label: partial.label ?? "New Tab",
// 		content: partial.content ?? "",
// 		icon: partial.icon ?? "note",
// 		color: partial.color,
// 		component: partial.component,
// 		isDefault: partial.isDefault ?? false,
// 		language: partial.language,
// 	};

// 	return TabSchema.parse(tab);
// }
