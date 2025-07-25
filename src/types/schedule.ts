export type ScheduleTag = {
	label: string;
	value: string;
	color?: string;
};

export type LinkedResource = {
	label: string;
	type: "note" | "dashboard" | "widget";
	resourceId: string;
};

export type ScheduleEvent = {
	id: string;
	title: string;
	start: string;
	end?: string;
	allDay?: boolean;
	tags?: { label: string; color?: string; value: string }[];
	resources?: { label: string; type: string; resourceId: string }[];
	notes?: string;
	location?: string;
	done?: boolean;
	recurring?: "none" | "daily" | "weekly" | "monthly" | "custom";
	reminder?: {
		minutesBefore: number;
		channels: ("browser" | "email" | "sms" | "audio")[];
	}[];
	notifyUsers?: string[];
	color?: string;
	icon?: string;
	isFocus?: boolean;
};
