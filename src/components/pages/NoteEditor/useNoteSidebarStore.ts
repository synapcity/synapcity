// // NoteEditor and Sidebar with Context Capture
// // ============================================
// // This file includes four modules:
// // 1. useNoteSidebarStore.ts — Zustand slice for persisting sidebar context
// // 2. NoteSidebar.tsx — UI for capturing contextual items
// // 3. NoteEditor.tsx — Lexical editor setup
// // 4. NoteTabsTable.tsx — Table-based UI for managing Note Tabs
// // 5. TaskTableDemo.tsx — Demo table with tasks

// // ------------------------
// // 1. useNoteSidebarStore.ts
// // ------------------------
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { nanoid } from "nanoid";

// interface ContextItem {
// 	id: string;
// 	content: string;
// }

// interface NoteSidebarState {
// 	items: ContextItem[];
// 	addItem: (content: string) => void;
// 	removeItem: (id: string) => void;
// }

// export const useNoteSidebarStore = create<NoteSidebarState>()(
// 	persist(
// 		(set) => ({
// 			items: [],
// 			addItem: (content: string) =>
// 				set((state) => ({
// 					items: [...state.items, { id: nanoid(), content: content.trim() }],
// 				})),
// 			removeItem: (id: string) =>
// 				set((state) => ({
// 					items: state.items.filter((item) => item.id !== id),
// 				})),
// 		}),
// 		{ name: "note-sidebar" }
// 	)
// );
