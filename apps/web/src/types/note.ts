// import type { z } from "zod";
// import { NoteSchema } from "@/schemas/data/note-schema";
// import type { BaseEntity } from "@/types/refactor/entity";
// import type { SerializedLexicalEditorState } from "./editor";

// export type Note = z.infer<typeof NoteSchema>;

// export type NoteTabType = "markdown" | "code" | "gallery" | "files" | "editor";

// export interface NoteTab extends BaseEntity {
// 	noteId: string;
// 	label: string;
// 	type: NoteTabType;
// 	editorState?: SerializedLexicalEditorState;
// 	content?: string;
// 	icon?: string;
// 	color?: string;
// 	isDefault: boolean;
// 	component?: React.ComponentType;
// 	isPinned?: boolean;
// 	viewMode?: "editor" | "preview";
// }
