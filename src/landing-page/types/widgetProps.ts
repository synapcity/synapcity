/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconType } from "react-icons";

export type WidgetCardProps = {
	id: string;
	type: WidgetType;
	component: React.ComponentType<any>;
	props: Record<string, any>;
};

export type AvailableWidget = {
	type: WidgetType;
	component: React.ComponentType<any>;
	props: Record<string, any>;
	info?: WidgetInfo;
};

/** Basic widget metadata/configuration */
export type WidgetInfo = {
	title: string;
	icon: IconType;
	height: number;
	width: number;
	maxHeight: number;
	maxWidth: number;
	minHeight: number;
	minWidth: number;
	defaultProps: Record<string, any>;
};

/** Possible widget type identifiers */
export type WidgetType = "list" | "notes" | "inbox";

/** Widget layout position and sizing info */
export type Layout = {
	i: string;
	y: number;
	x: number;
	w: number;
	minW: number;
	maxW: number;
	h: number;
	minH: number;
	maxH: number;
};

/** Widget runtime instance */
export type Widget = {
	id: string;
	type: WidgetType;
	component: React.ComponentType<any>;
	props: Record<string, any>;
	layout: Layout;
	isDeleted: boolean;
};

/** Widget component map for rendering */
// export type WidgetComponent = React.ComponentType<
// 	typeof TaskWidget | typeof NoteWidget
// >;

/** List Widget-specific data */
export type ListItem = {
	content: string;
	completed: boolean;
};

export type List = {
	title: string;
	items: ListItem[];
};

/** Note Widget-specific data */
export type Note = {
	content: string;
};

export type InboxItem = {
	content: string;
	createdAt: string;
};

export type Inbox = {
	title: string;
	initialItems: InboxItem[];
};

/** Extended types for typed widget instances */
export type ListWidget = Widget & List;
export type NoteWidgetType = Widget & Note;
export type InboxWidgetType = Widget & Inbox;
