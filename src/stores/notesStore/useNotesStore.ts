import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createEntityStore, type EntityStore } from "@/stores/factory";
import type { Note } from "@/types/note";
import { migrateNotesStore } from "./migrate";

const makeNote = (p: Partial<Note> = {}): Note => {
	const now = new Date().toISOString();
	return {
		id: p.id ?? "",
		title: p.title ?? "Untitled",
		summary: p.summary ?? "",
		preview: p.preview ?? "",
		tags: p.tags ?? [],
		icon: p.icon ?? "Note",
		createdAt: now,
		updatedAt: now,
		deletedAt: null,
	};
};

export type NotesStore = EntityStore<Note>;

export const useNotesStore = create<NotesStore>()(
	persist(
		createEntityStore<Note>({
			entityName: "note",
			createItem: makeNote,
			migrate: migrateNotesStore,
		}),
		{
			name: "notes-store",
			version: 2,
			migrate: migrateNotesStore,
			partialize: (state) => ({ items: state.items }),
		}
	)
);
