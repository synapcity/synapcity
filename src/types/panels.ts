export type PanelModule = {
	id: string;
	type: UserPanelSection;
	label: string;
	icon: string;
	description?: string;
	component: React.ComponentType;
	sidebar?: React.ComponentType;
	layout?: {
		isPinned?: boolean;
		isHidden?: boolean;
		isFavorite?: boolean;
	};
};

export type UserPanelSection =
	| "overview"
	| "inbox"
	| "schedule"
	| "journal"
	| "goals"
	| "widgets"
	| "bookmarks"
	| "drafts";

export type UserPanelSectionGroup = "meta" | "content" | "system";
