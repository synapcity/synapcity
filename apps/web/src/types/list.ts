// "use client";

// import { ThemePreferences } from "@/theme";
// import type { BaseEntity } from "@/types/refactor/entity";

// export type ItemStatus = "done" | "not-started" | "in-progress";

// export type Item = BaseEntity & {
// 	content: string;
// 	status: ItemStatus;
// };
// // export type ListUIState<T> = ComponentUIState & {
// // 	sortBy: keyof T;
// // 	sortOrder: "asc" | "desc";
// // 	selectedId: string | null;
// // 	batchSelectedIds: string[];
// // };

// export interface ListConfig<T> {
// 	itemOrder?: string[];
// 	itemsPerPage?: number;
// 	defaultSort?: keyof T; // e.g. "createdAt" | "status"
// 	defaultFilter?: { status?: ItemStatus; search?: string };
// 	defaultView?: "list" | "board" | "calendar";
// }

// export type ListTheme = ThemePreferences & {
// 	icon?: string;
// };

// export type List<T extends BaseEntity> = BaseEntity & {
// 	/** Human‑readable name */
// 	name?: string;
// 	/** Domain/type of this list, e.g. "todo", "schedule" */
// 	type: string;
// 	/** Optional parent for namespacing across dashboards, widgets, etc. */
// 	parentId?: string;
// 	parentType?: string;
// 	description?: string;
// 	tags?: string[];
// 	theme?: ListTheme;
// 	config?: ListConfig<T>;
// 	/** Your actual items—never undefined, default to [] */
// 	items: T[];
// 	/** Ephemeral UI state (sorting, selection, etc.) */
// 	meta: ListUIState<T>;
// };

// export interface ListUIState<T> {
// 	sortBy: keyof T;
// 	sortOrder: "asc" | "desc";
// 	selectedId: string | null;
// 	batchSelectedIds: string[];
// }

// /** Slice methods for managing ListUIState<T> keyed by listId */
// export interface ListUISlice<T> {
// 	/** map: listId → UI state */
// 	listUI: Record<string, ListUIState<T>>;

// 	/** ensure a default UI state entry and return it */
// 	getListUI: (listId: string) => ListUIState<T>;

// 	/** update sorting key */
// 	setSortBy: (listId: string, sortBy: keyof T) => void;

// 	/** update sorting order */
// 	setSortOrder: (listId: string, sortOrder: "asc" | "desc") => void;

// 	/** select a single item in the list */
// 	setSelectedId: (listId: string, id: string | null) => void;

// 	/** toggle one ID in the batchSelectedIds set */
// 	toggleBatchSelected: (listId: string, id: string) => void;

// 	/** clear the batch selection for that list */
// 	clearBatchSelected: (listId: string) => void;
// }
