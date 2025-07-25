import rawNotes from "@/lib/data/notes.json";
import { initItems } from "@/utils/initItems";
import { createResourceStore, ResourceStore } from "@/stores/factories";
import {
	createNote,
	NoteResourceSchema,
	type Note,
} from "@/schemas/resources/note-schema";
import { useNoteViewStore } from "../noteViewStore";

export const useNoteStore = createResourceStore<Note>({
	resourceName: "note",
	schema: NoteResourceSchema,
	persistKey: "synapcity-notes",
	createItem: createNote,
	initItems: (set) => (raw) => {
		const parsed = initItems<Note>(raw, NoteResourceSchema, createNote);
		set({ items: parsed });
	},
	afterHydrate: (state, err) => {
		state.setHasHydrated(true);
		if (!err && Object.values(state.items).length === 0) {
			state.initItems?.(rawNotes);
		}
	},
	customActions: (set, get) => ({
		async addResourceWithDefaultView(data: Partial<Note>) {
			const note = await get().addResource(data);
			useNoteViewStore.getState().addView(note.id, "editor");
			return note;
		},
		updateTitle: (id: string, title: string) => {
			set((state: Partial<ResourceStore<Note>>) => ({
				items: {
					...state.items,
					[id]: {
						...state.items?.[id],
						title,
					},
				},
			}));
		},
		resetAll: () => {
			set({ items: {} });
		},
		getByTag: (tag: string) =>
			Object.values(get().items).filter((n) => n.tags?.includes(tag)),
	}),
});
