import { z } from "zod";
import { BaseResource, ResourceSchema } from "../factory/base-schema";

export const EntityTypeSchema = z.enum(["note", "dashboard", "widget", "list"]);
export type EntityType = z.infer<typeof EntityTypeSchema>;

export const ViewTypeSchema = z.enum(["editor", "code", "image", "custom"]);
export type ViewType = z.infer<typeof ViewTypeSchema>;

export const EditorViewSchema = z.object({
	type: z.literal("editor"),
	content: z.string().default(""),
	editorState: z
		.string()
		.default(
			'{"root":{"children":[{"type":"paragraph","children":[{"text":""}]}],"type":"root"}}'
		),
});

export type EditorView = z.infer<typeof EditorViewSchema>;
export const CodeViewSchema = z.object({
	type: z.literal("code"),
	content: z.string().default(""),
	language: z.string().default("plaintext"),
});
export type CodeView = z.infer<typeof CodeViewSchema>;
export const ImageViewSchema = z.object({
	type: z.literal("image"),
	imageIds: z.array(z.string()).default([]),
});
export type ImageView = z.infer<typeof ImageViewSchema>;
export const CustomViewSchema = z.object({
	type: z.literal("custom"),
	settings: z.record(z.any()).default({})
});

export type CustomView = z.infer<typeof CustomViewSchema>;
export const ViewDataSchema = z
	.object({
		entity: EntityTypeSchema,
		entityId: z.string(),
		label: z.string().min(1).default("New View"),
		order: z.number().nonnegative().default(0),
		isDefault: z.boolean().default(false),
		icon: z.string().optional()
	})
	.and(
		z.discriminatedUnion("type", [
			EditorViewSchema,
			CodeViewSchema,
			ImageViewSchema,
			CustomViewSchema,
		])
	);
export type RawView = z.infer<typeof ViewDataSchema>;

export const ViewResourceSchema = ResourceSchema(ViewDataSchema);

export type ViewResource = z.infer<typeof ViewResourceSchema>;

export type ViewTypeDef = EditorView | CodeView | ImageView | CustomView;

export type CombinedEditor = ViewResource & EditorView & BaseResource;

export function createView(partial: Partial<ViewResource> = {}): ViewResource {
	const now = new Date().toISOString();
	const base = {
		id: partial.id || crypto.randomUUID(),
		createdAt: partial.createdAt || now,
		updatedAt: now,
		deletedAt: partial.deletedAt ?? null,
		label: partial.label ?? "New View",
		order: partial.order ?? 0,
		isDefault: partial.isDefault ?? false,
		entity: partial.entity!,
		entityId: partial.entityId!,
	};

	const type = partial.type ?? "editor";

	const view = { ...base, type };

	switch (type) {
		case "editor":
			const editorContent = (partial as Partial<EditorView>).content ?? "";
			const editorState =
				(partial as Partial<EditorView>).editorState ??
				'{"root":{"children":[{"type":"paragraph","children":[{"text":""}]}],"type":"root"}}';

			return ViewResourceSchema.parse({
				...view,
				icon: "note",
				content: editorContent,
				editorState,
			});
			break;

		case "code":
			const codeContent = (partial as Partial<CodeView>).content ?? "";
			const language = (partial as Partial<CodeView>).language ?? "plaintext";
			return ViewResourceSchema.parse({
				...view,
				content: codeContent,
				language,
				icon: "code"
			});

		case "image":
			const imageIds = (partial as Partial<ImageView>).imageIds ?? [];
			return ViewResourceSchema.parse({
				...view,
				imageIds,
				icon: "image"
			});

		case "custom":
			const settings = (partial as Partial<CustomView>).settings ?? {};
			return ViewResourceSchema.parse({
				...view,
				settings,
				icon: "penLine"
			});

		default:
			throw new Error(`Unsupported view type: ${type}`);
	}
}
