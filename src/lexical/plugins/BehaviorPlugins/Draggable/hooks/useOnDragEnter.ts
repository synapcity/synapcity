"use client";

import { draggableStore } from "../store/useDraggableStore";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback } from "react";
import { DRAGGABLE_KEY, isInstanceOfHTMLElement } from "@/lexical/constants";

export const useOnDragEnter = () => {
	const [editor] = useLexicalComposerContext();

	const handleOnDragEnter = useCallback(
		(event: DragEvent): boolean => {
			event.preventDefault();

			const target = event.currentTarget;

			if (!isInstanceOfHTMLElement(target)) {
				console.error("[On drag enter] CurrentTarget is not Html element");
				return false;
			}

			const key = target?.getAttribute(DRAGGABLE_KEY);

			if (!key) {
				return false;
			} else {
				console.log(`Lexical node key is ${key}`);
			}

			const element = editor.getElementByKey(key);

			if (!isInstanceOfHTMLElement(element)) {
				console.error("[handleOnDragEnter] element is not HTMLElement");
				return false;
			}

			const coordinates = element?.getBoundingClientRect();
			const containerElement = document.getElementById(
				"lexical-draggable-wrapper-id"
			);
			const containerCoordinates = containerElement?.getBoundingClientRect();

			if (coordinates) {
				draggableStore.getState().setLine({
					htmlElement: element,
					data: {
						top: coordinates.top - (containerCoordinates?.top ?? 0),
						left: coordinates.left - (containerCoordinates?.left ?? 0),
						height: coordinates.height,
						width: coordinates.width,
					},
				});
			}

			return true;
		},
		[editor]
	);

	return { handleOnDragEnter };
};
