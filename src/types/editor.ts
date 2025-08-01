import type { SerializedLexicalNode } from "lexical";

export interface SerializedTextNode extends SerializedLexicalNode {
	type: "text";
	text: string;
	format: number;
	style?: string;
	detail?: number;
	mode?: "normal" | "token";
}

export interface SerializedElementNode extends SerializedLexicalNode {
	type:
		| "paragraph"
		| "heading"
		| "quote"
		| "list"
		| "listitem"
		| "root"
		| "code"
		| (string & {});
	tag?: string;
	format?: number;
	indent?: number;
	direction?: "ltr" | "rtl" | null;
	children: SerializedLexicalNodeWithChildren[];
}

export type SerializedLexicalNodeWithChildren =
	| SerializedTextNode
	| SerializedElementNode
	| SerializedCustomNode;

export interface SerializedCustomNode extends SerializedLexicalNode {
	type: string;
	children?: SerializedLexicalNodeWithChildren[];
}

export interface SerializedLexicalEditorState {
	root: SerializedElementNode & { type: "root" };
}
