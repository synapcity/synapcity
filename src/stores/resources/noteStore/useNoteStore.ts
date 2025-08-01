import rawNotes from "@/lib/data/notes.json";
import { initItems } from "@/utils/initItems";
import { createResourceStore, ResourceStore } from "@/stores/factories";
import {
	createNote,
	NoteResourceSchema,
	type Note as NoteResource,
} from "@/schemas/resources/note-schema";
import { useNoteViewStore } from "../noteViewStore";
import type { StoreApi, UseBoundStore } from "zustand";

export interface NoteStore extends ResourceStore<NoteResource> {
	addResourceWithDefaultView(
		data: Partial<NoteResource>
	): Promise<NoteResource>;
	updateTitle(id: string, title: string): void;
	resetAll(): void;
	getByTag(tag: string): NoteResource[];
}

const _useNoteStore = createResourceStore<NoteResource>({
	resourceName: "note",
	schema: NoteResourceSchema,
	persistKey: "synapcity-notes",
	createItem: createNote,

	initItems: (set, get) => (raw) => {
		if (Object.values(get().items).length > 0 || !get().hasHydrated) return;
		const parsed = initItems<NoteResource>(raw, NoteResourceSchema, createNote);
		set({ items: parsed });
	},

	afterHydrate: (state, err) => {
		state.setHasHydrated(true);
		if (!err && Object.values(state.items).length === 0) {
			state.initItems?.(rawNotes);
		}
	},

	customActions: (set, get) => ({
		async addResourceWithDefaultView(data: Partial<NoteResource>) {
			const note = await get().addResource(data);
			useNoteViewStore.getState().addView(note.id, "editor");
			return note;
		},
		updateTitle(id: string, title: string) {
			set((state) => ({
				items: { ...state.items, [id]: { ...state.items[id], title } },
			}));
		},
		resetAll() {
			set({ items: {} });
		},
		getByTag(tag: string) {
			return Object.values(get().items).filter((n) => n.tags?.includes(tag));
		},
	}),
});

export const useNoteStore = _useNoteStore as unknown as UseBoundStore<
	StoreApi<NoteStore>
>;
