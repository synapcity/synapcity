import type { ResourceStore } from "@/stores/resources/factory/resourceStore";
import type {
	CodeView,
	CombinedEditor,
	CustomView,
	EditorView,
	ImageView,
	ViewResource,
	ViewType,
	ViewTypeDef,
} from "@/stores/resources/noteViewStore/view-schema";
import { StateCreator } from "zustand";
import { BaseResource } from "@/stores";
import { fallbackEditorState } from "@/lexical/constants";

type NoteView = ViewResource & ViewTypeDef;

export interface ViewSlice<T> {
	getViewsFor(parentId: string): T[];
	addView(parentId: string, type: ViewType): Promise<T>;
	removeView(id: string): void;
}

export const createViewSlice =
	<T extends BaseResource & { entityId: string }>(): StateCreator<
		ResourceStore<T> & ViewSlice<T>,
		[],
		[],
		ViewSlice<T>
	> =>
	(set, get, _store) => ({
		getViewsFor: (parentId: string): T[] =>
			get()
				.getAllResources()
				.filter((v) => v.entityId === parentId),

		addView: async (parentId: string, type: ViewType): Promise<T> => {
			const order = get().getViewsFor(parentId).length;
			const now = new Date().toISOString();
			const base = {
				id: crypto.randomUUID(),
				createdAt: now,
				updatedAt: now,
				deletedAt: null,
				entityId: parentId,
				entity: "note",
				order,
				isDefault: order === 0 ? true : false,
				type,
			};
			const data = base as unknown as Partial<T>;
			if (type === "editor") {
				(data as unknown as NoteView & EditorView).content =
					"Start typing here...";
				(data as unknown as CombinedEditor).editorState = fallbackEditorState;
			} else if (type === "code") {
				const codeData = data as unknown as NoteView & CodeView;
				codeData.content = "";
				codeData.language = "js";
			} else if (type === "image") {
				const imageData = data as unknown as NoteView & ImageView;
				imageData.imageIds = [];
			} else {
				(data as unknown as NoteView & CustomView).settings = {};
			}
			const v = await get().addResource({
				...data,
				entityId: parentId,
			});
			set((state) => ({
				activeByScope: {
					...state.activeByScope,
					[parentId]: v.id,
				},
			}));
			return v as T;
		},

		removeView: (id: string): void => {
			const all = get().getAllResources() as T[];
			const view = all.find((v) => v.id === id);
			if (!view) return;

			const siblings = all.filter((v) => v.entityId === view.entityId);
			if (siblings.length <= 1) {
				console.warn(`Cannot remove the last view for ${view.entityId}`);
				return;
			}
			get().deleteResource(id);
		},
	});
