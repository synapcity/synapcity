export type EntityType =
	| "note"
	| "notebook"
	| "library"
	| "dashboard"
	| "resource"
	| "global"
	| "component"
	| string;

export type ViewModeMap = {
	note: "edit" | "preview" | "split";
	dashboard: "grid" | "kanban" | "timeline";
	notebook: "list" | "grouped";
	library: "card" | "list";
	resource: never;
	global: "";
};
