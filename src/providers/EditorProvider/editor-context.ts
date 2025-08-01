"use client";

import { createContext } from "react";
import { LexicalEditor } from "lexical";

export type EditorMap = Record<string, LexicalEditor | undefined>;

export type Clipboard = {
	content: string | null;
	sourceEditorId: string | null;
};

export type EditorProviderState = {
	editors: EditorMap;
	activeEditorId: string | null;
	clipboard: Clipboard;
};

export type EditorProviderActions = {
	registerEditor: (id: string, editor: LexicalEditor) => void;
	unregisterEditor: (id: string) => void;
	setActiveEditorId: (id: string) => void;
	copyToClipboard: (content: string, sourceEditorId: string) => void;
	pasteFromClipboard: (targetEditor: string) => void;
};

export type EditorProviderValue = EditorProviderState & EditorProviderActions;

export const EditorContext = createContext<EditorProviderValue | null>(null);
