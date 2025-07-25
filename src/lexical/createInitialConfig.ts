import { InitialConfigType } from "@lexical/react/LexicalComposer";
import { loadAllNodes } from "./nodes/nodeLoader";
import { theme } from "./theme";
import { EditorState, createEditor } from "lexical";

export function getSafeEditorState(content: string): EditorState {
	try {
		const editor = createEditor();
		const parsed = JSON.parse(content);
		return editor.parseEditorState(parsed);
	} catch (err) {
		console.warn("Failed to parse content. Using fallback.", err);
		const editor = createEditor();
		return editor.getEditorState();
	}
}

export async function createInitialConfig(
	id: string
): Promise<InitialConfigType> {
	const nodes = await loadAllNodes();
	return {
		namespace: `note-${id}`,
		theme,
		editorState: null,
		onError(error: Error) {
			console.error("Lexical Error:", error);
		},
		nodes,
	};
}
