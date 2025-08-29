// import { fallbackEditorState } from "@/lexical/constants"; // or define it inline

// type LexicalNode = {
// 	type: string;
// 	version: number;
// 	children?: LexicalNode[];
// 	text?: string;
// 	[key: string]: any;
// };

// export type LexicalEditorState = {
// 	root: LexicalNode;
// 	type: string;
// 	version: number;
// };

// export function sanitizeEditorState(raw: string): string {
// 	try {
// 		const parsed = JSON.parse(raw);

// 		if (typeof parsed !== "object" || parsed === null) {
// 			throw new Error("Editor state must be an object");
// 		}

// 		// Ensure top-level keys
// 		if (parsed.type !== "editor") {
// 			parsed.type = "editor";
// 		}
// 		if (typeof parsed.version !== "number") {
// 			parsed.version = 1;
// 		}

// 		// Ensure root node
// 		const root = parsed.root;
// 		if (!root || typeof root !== "object" || root.type !== "root") {
// 			throw new Error("Missing or invalid root node");
// 		}

// 		// Ensure root.children exists
// 		if (!Array.isArray(root.children)) {
// 			root.children = [
// 				{
// 					type: "paragraph",
// 					version: 1,
// 					children: [
// 						{
// 							type: "text",
// 							text: "",
// 							version: 1,
// 						},
// 					],
// 				},
// 			];
// 		}

// 		// Validate each child minimally
// 		root.children = root.children.map((child: any) => {
// 			if (typeof child !== "object" || !child.type) {
// 				return {
// 					type: "paragraph",
// 					version: 1,
// 					children: [
// 						{
// 							type: "text",
// 							text: "",
// 							version: 1,
// 						},
// 					],
// 				};
// 			}
// 			return child;
// 		});

// 		return JSON.stringify(parsed);
// 	} catch (err) {
// 		console.warn(
// 			"[sanitizeEditorState] Failed to repair state, falling back:",
// 			err
// 		);
// 		return fallbackEditorState;
// 	}
// }

import { fallbackEditorState } from "@/lexical/constants";

export function sanitizeEditorState(raw: string): string {
  try {
    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed !== "object" ||
      parsed.type !== "editor" ||
      !parsed.root ||
      parsed.root.type !== "root"
    ) {
      throw new Error("Malformed editor state");
    }
    return raw;
  } catch (e) {
    console.warn("[sanitizeEditorState]: Invalid state recovered:", e);
    return fallbackEditorState;
  }
}
