import { z } from "zod";
import { EntityBaseSchema } from "./base-schema";

// 2. TodoStatus enum and schema
export const TodoStatusSchema = z.enum(["done", "not-started", "in-progress"]);
export type TodoStatus = z.infer<typeof TodoStatusSchema>;

// 3. TodoItem schema (extends EntityBase)
export const TodoItemSchema = EntityBaseSchema.extend({
	content: z.string(),
	status: TodoStatusSchema,
});
export type TodoItem = z.infer<typeof TodoItemSchema>;

// 4. Example: createItem factory using schema defaults
export function createTodoItem(partial: Partial<TodoItem> = {}): TodoItem {
	const now = new Date().toISOString();
	const base = {
		id: partial.id || crypto.randomUUID(),
		createdAt: partial.createdAt || now,
		updatedAt: partial.updatedAt || now,
		deletedAt: partial.deletedAt ?? null,
	};
	return TodoItemSchema.parse({
		...base,
		content: partial.content || "",
		status: partial.status || "not-started",
	});
}

// 5. Extend this pattern for other entities:
// export const NoteItemSchema = EntityBaseSchema.extend({ ... });
// export type NoteItem = z.infer<typeof NoteItemSchema>;
// export function createNoteItem(partial: Partial<NoteItem>) { ... }

// 6. Form schema for creating/updating a todo (no id/date fields)
export const TodoFormSchema = z.object({
	content: z.string().min(1, "Content is required"),
	status: TodoStatusSchema,
});
export type TodoForm = z.infer<typeof TodoFormSchema>;

// 7. Example usage in form:
// const form = useForm({ resolver: zodResolver(TodoFormSchema) });
