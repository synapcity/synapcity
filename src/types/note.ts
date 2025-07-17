import { SerializedLexicalEditorState } from "./editor";

export interface Note {
	id: string;
	title: string;
	icon: string;
	summary?: string;
	preview?: string;
	tags: string[];
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
}

export type NoteTabType =
	| "markdown"
	| "code"
	| "draft"
	| "reference"
	| "editor";

export interface NoteTab {
	id: string;
	noteId: string;
	label: string;
	type: NoteTabType;
	editorState?: SerializedLexicalEditorState;
	content?: string;
	icon?: string;
	color?: string;
	isDefault: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt?: string | null;
	component?: React.ComponentType;
	isPinned?: boolean;
	viewMode?: "editor" | "preview";
}
