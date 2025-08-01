"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useSearchMatchStore } from "./searchMatchStore";

export function useScrollToSearchMatch() {
	const [editor] = useLexicalComposerContext();
	const { matches, activeIndex } = useSearchMatchStore();

	useEffect(() => {
		if (
			matches.length === 0 ||
			activeIndex < 0 ||
			activeIndex >= matches.length
		)
			return;

		const match = matches[activeIndex];

		editor.getEditorState().read(() => {
			const dom = editor.getElementByKey(match.nodeKey);
			if (!dom) return;

			const textNode = dom.firstChild;
			if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;

			const range = document.createRange();
			try {
				range.setStart(textNode, match.start);
				range.setEnd(textNode, match.end);
				const rect = range.getBoundingClientRect();
				window.scrollTo({
					top: rect.top + window.scrollY - window.innerHeight / 2,
					behavior: "smooth",
				});
			} catch (e) {
				console.warn("Scroll to match failed:", e);
			}
		});
	}, [editor, matches, activeIndex]);
}
