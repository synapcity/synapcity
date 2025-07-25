/* eslint-disable @typescript-eslint/no-explicit-any */
export type PluginLoader<P> = () => Promise<{
	default: React.ComponentType<P>;
}>;

export type PluginMap<T> = {
	[key: string]: PluginLoader<T>;
};

interface RichTextPluginProps {
	contentEditable: JSX.Element<ContentEditableProps>;
	placeholder?:
		| JSX.Element
		| ((isEditable: boolean) => JSX.Element | null)
		| null;
	ErrorBoundary: React.ComponentType;
}

interface ContentEditableProps {
	className?: string;
}

interface OnChangeProps {
	onChange: (editorState: EditorState) => void;
}

type PluginLoader<P> = () => Promise<{ default: React.ComponentType<P> }>;

type PluginMap = {
	[key: string]: PluginLoader;
};

interface RichTextPluginProps {
	contentEditable: JSX.Element<ContentEditableProps>;
	placeholder?:
		| JSX.Element
		| ((isEditable: boolean) => JSX.Element | null)
		| null;
	ErrorBoundary: React.ComponentType;
}

interface ContentEditableProps {
	className?: string;
}

interface OnChangeProps {
	onChange: (editorState: EditorState) => void;
}

interface ToolbarProps {
	note: NoteWithAnnotations;
}

interface EditorProps {
	entity: any;
	isAdvanced?: boolean;
	isFile?: boolean;
	isNote?: boolean;
}
interface Comment {
	id: string;
	noteId: string;
	content: string;
	persistentKey?: string | null;
	updatedAt: Date;
}

export interface EditorProps {
	entity: Note | File;
}
interface Note {
	id: string;
	fileId: string;
	content: string | null;
	title: string;
	persistentKey?: string | null;
}

interface File {
	id: string;
	content: string;
	title: string;
}

// interface NoteWithMetadata extends Note {
// 	comments: Comment[];
// }

// interface NoteWithAnnotations extends Note {
// 	resources?: Partial<Resource>[];
// 	// links: Link[];
// 	comments?: Comment[];
// }

// type PartialRecord<K extends keyof any, T> = {
// 	[P in K]?: T;
// };

export type SidebarType = "Comments" | "Links" | "Resources";

export interface Coordinates {
	top: number;
	left: number;
	right: number;
	height: number;
	width: number;
}

export type ResourceType = "IMAGE" | "LINK" | "VIDEO" | "FILE";
