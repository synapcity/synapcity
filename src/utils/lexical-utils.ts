/* eslint-disable @typescript-eslint/no-explicit-any */

import { showToast } from "@/lib/toast";
import {
	createEditor,
	$getRoot,
	EditorState,
	type EditorConfig,
	type LexicalEditor,
	type SerializedEditorState,
	type SerializedRootNode,
	type SerializedElementNode,
	type SerializedTextNode,
	type SerializedLexicalNode,
} from "lexical";

export const FormatFlags = {
	BOLD: 1,
	ITALIC: 2,
	UNDERLINE: 4,
	STRIKETHROUGH: 8,
} as const;

/** ————————————————————————————————————————————————
 * 1) Migration helper: normalize old JSON shapes to your current schema
 */
export function migrateState(
	parsed: any
):
	| SerializedEditorState<SerializedLexicalNode>
	| SerializedRootNode<SerializedLexicalNode>["children"] {
	// For example: convert old heading-2 types into type + level
	if (Array.isArray(parsed)) {
		return parsed.map((block: any) => {
			if (block.type === "heading-2") {
				return {
					...block,
					type: "heading",
					level: 2,
				};
			}
			return block;
		});
	}
	// Otherwise assume it’s already a full SerializedEditorState
	return parsed;
}

/** ————————————————————————————————————————————————
 * Types and Guards
 */
export type RawLexicalBlock = SerializedElementNode & {
	key: string;
	children: SerializedTextNode[];
	level?: number;
	listType?: string;
	url?: string;
	altText?: string;
};

export function isTextNode(node: any): node is SerializedTextNode {
	return node?.type === "text" && typeof node.text === "string";
}

/** ————————————————————————————————————————————————
 * 2) flattenLexicalRow enhancements: inline formatting, images, links
 */
export function flattenLexicalRow(
	node: RawLexicalBlock & { level?: number; url?: string; altText?: string }
) {
	const parts: string[] = [];

	node.children.filter(isTextNode).forEach((c) => {
		let txt = c.text;
		const fmt = c.format ?? 0;
		if (fmt & FormatFlags.BOLD) txt = `**${txt}**`;
		if (fmt & FormatFlags.ITALIC) txt = `_${txt}_`;
		if (fmt & FormatFlags.UNDERLINE) txt = `<u>${txt}</u>`;
		if (fmt & FormatFlags.STRIKETHROUGH) txt = `~~${txt}~~`;
		parts.push(txt);
	});

	if ((node as any).url) {
		parts.push(`![${(node as any).altText || "img"}](${(node as any).url})`);
	}

	if (node.listType === "bullet") {
		parts.unshift("- ");
	} else if (node.listType === "number") {
		parts.unshift("1. ");
	}

	if (node.type === "divider") {
		parts.push("---");
	}

	return {
		id: node.key,
		type: node.type,
		level: node.level ?? null,
		content: parts.join(""),
	};
}

/** ————————————————————————————————————————————————
 * 3) & 4) create / serialize / parse with migrations and error‑handling callback
 */
export function createEmptyEditorState(config?: EditorConfig): EditorState {
	const editor = createEditor(config);
	return editor.getEditorState();
}

export function getDefaultSerializedState(
	minimal = false,
	config?: EditorConfig
): string {
	const editor = createEditor(config);
	let obj: any;
	editor.getEditorState().read(() => {
		if (minimal) {
			obj = $getRoot()
				.getChildren()
				.map((n) => (n as any).toJSON());
		} else {
			obj = editor.getEditorState().toJSON();
		}
	});
	return JSON.stringify(obj);
}

export function getSafeEditorState(
	serialized: string,
	config?: EditorConfig,
	onError?: (e: Error) => void
): EditorState {
	const editor = createEditor(config);
	try {
		const parsedRaw = JSON.parse(serialized);
		const migrated = migrateState(parsedRaw);
		const fullState: SerializedEditorState<SerializedLexicalNode> =
			Array.isArray(migrated) && !("root" in migrated)
				? ({
						root: {
							type: "root",
							version: 1,
							children: migrated,
							direction: null,
							format: 0 as any,
							indent: 0,
						},
				  } as unknown as SerializedEditorState<SerializedLexicalNode>)
				: (migrated as SerializedEditorState<SerializedLexicalNode>);
		return editor.parseEditorState(fullState);
	} catch (err: any) {
		onError?.(err);
		showToast.error("Corrupted content -- reseting editor state");
		console.warn("Parse failed, using empty state.", err);
		return createEmptyEditorState(config);
	}
}

/** ————————————————————————————————————————————————
 * 5) Round‑trip test util
 */
export function testRoundTripSerializer(
	editor: LexicalEditor,
	minimal = false
): boolean {
	const first = serializeEditorState(editor, minimal);
	const state = getSafeEditorState(first, editor._config, (e) => {
		console.error("Round‐trip parse error", e);
	});
	// Temporarily set state back into an editor instance for re‐serialization:
	const tempEditor = createEditor(editor._config);
	tempEditor.setEditorState(state);
	const second = serializeEditorState(tempEditor, minimal);
	return first === second;
}

/** ————————————————————————————————————————————————
 * 6) Extract / Flatten
 */
export function extractRawBlocks(state: EditorState): RawLexicalBlock[] {
	let blocks: RawLexicalBlock[] = [];
	state.read(() => {
		blocks = $getRoot()
			.getChildren()
			.map((n) => (n as any).toJSON());
	});
	return blocks;
}

export function getFlattenedLexicalData(
	serialized: string,
	config?: EditorConfig
) {
	try {
		const state = getSafeEditorState(serialized, config);
		return extractRawBlocks(state).map(flattenLexicalRow);
	} catch (err: any) {
		showToast.error(`Error preparing export: ${err}`);
		return serialized;
	}
}

export function serializeEditorState(
	editor: LexicalEditor,
	minimal = false
): string {
	let obj = {} as SerializedEditorState | SerializedRootNode["children"];
	editor.getEditorState().read(() => {
		if (minimal) {
			obj = $getRoot()
				.getChildren()
				.map((n) => (n as any).toJSON());
		} else {
			obj = editor.getEditorState().toJSON();
		}
	});
	return JSON.stringify(obj);
}

export function getSafeInitialContent(content: string | undefined | null) {
	try {
		if (!content || content.trim() === "") throw new Error("Empty content");

		const parsed = JSON.parse(content);
		if (!parsed?.root || parsed.root.type !== "root")
			throw new Error("Invalid root");
		if (
			!Array.isArray(parsed.root.children) ||
			parsed.root.children.length === 0
		)
			throw new Error("No children in root");

		return parsed;
	} catch {
		return {
			root: {
				type: "root",
				children: [
					{
						type: "paragraph",
						children: [],
						direction: null,
						format: "",
						indent: 0,
						version: 1,
					},
				],
				direction: "ltr",
				format: "",
				indent: 0,
				version: 1,
			},
			version: 1,
		};
	}
}

export function safeParseLexicalState(content: string) {
	try {
		let parsed = JSON.parse(content);
		// If still a string, parse again!
		if (typeof parsed === "string") {
			parsed = JSON.parse(parsed);
		}
		return parsed;
	} catch (err) {
		console.warn(`Error occurred while parsing lexical state: ${err}`);
		return {
			root: {
				children: [
					{
						type: "paragraph",
						children: [],
						direction: null,
						format: "",
						indent: 0,
						version: 1,
					},
				],
				direction: "ltr",
				format: "",
				indent: 0,
				type: "root",
				version: 1,
			},
			type: "editor",
			version: 1,
		};
	}
}

export const loadContent = async () => {
	// 'empty' editor
	const value =
		'{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

	return value;
};
