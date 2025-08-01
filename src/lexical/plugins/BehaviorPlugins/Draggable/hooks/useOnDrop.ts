"use client";
import { useCallback, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey, DROP_COMMAND, COMMAND_PRIORITY_HIGH } from "lexical";
import { draggableStore } from "../store/useDraggableStore";
import { DRAGGABLE_KEY } from "@/lexical/constants";

export const useOnDrop = () => {
	const [editor] = useLexicalComposerContext();

	const onDrop = useCallback((e: DragEvent) => {
		e.preventDefault();
		const store = draggableStore.getState();
		const lineEl =
			store.line?.htmlElement ||
			(e.target instanceof HTMLElement &&
				e.target.closest(`[${DRAGGABLE_KEY}]`));
		if (!lineEl) return false;

		const dropKey = lineEl.getAttribute(DRAGGABLE_KEY);
		const dragEl = store.draggable?.htmlElement;
		const dragKey = dragEl?.getAttribute(DRAGGABLE_KEY);
		if (!dropKey || !dragKey) return false;

		const dropNode = $getNodeByKey(dropKey);
		const dragNode = $getNodeByKey(dragKey);
		if (!dropNode || !dragNode) return false;

		dropNode.insertAfter(dragNode);
		return true;
	}, []);

	useEffect(() => {
		return editor.registerCommand(DROP_COMMAND, onDrop, COMMAND_PRIORITY_HIGH);
	}, [editor, onDrop]);
};
