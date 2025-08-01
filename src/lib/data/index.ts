import type { Item } from "@/components/tables/Todos/columns";
// import type { NoteItem }  from "@/components/tables/NoteTable/columns";

export const dataLoaders = {
	lists: () => import("./lists.json") as Promise<{ default: Partial<Item>[] }>,
	// notes: () => import("./notes.json") as Promise<{ default: NoteItem[] }>,
};

export type DataKey = keyof typeof dataLoaders;
