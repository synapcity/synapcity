export const DRAGGABLE_KEY = "draggable-key";

export const isInstanceOfHTMLElement = (
	target: EventTarget | null
): target is HTMLElement => target instanceof HTMLElement;

export const fallbackEditorState = JSON.stringify({
	root: {
		children: [
			{
				children: [
					{
						text: "Write something here...",
						type: "text",
						version: 1,
					},
				],
				direction: "ltr",
				format: "",
				indent: 0,
				type: "paragraph",
				version: 1,
				textFormat: 0,
				textStyle: "",
			},
		],
		type: "root",

		version: 1,
		format: "",
		indent: 0,
		direction: null,
	},
	type: "editor",
	version: 1,
});
