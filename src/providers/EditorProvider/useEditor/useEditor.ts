"use client";

import { useContext } from "react";
import { EditorContext } from "../editor-context";

export const useEditor = () => {
	const context = useContext(EditorContext);
	if (!context) {
		throw new Error("useEditorProvider must be used within EditorProvider");
	}
	return context;
};
