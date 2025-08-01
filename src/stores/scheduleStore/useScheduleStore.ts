import { create } from "zustand";

export type ScheduleEvent = {
	id: string;
	title: string;
	start: string; // ISO string
	end?: string;
	allDay?: boolean;
	tags?: { label: string; color?: string; value: string }[];
	resources?: { label: string; type: string; resourceId: string }[];
	notes?: string;
	done?: boolean;
	color?: string;
	icon?: string;
	location?: string;
	recurring?: "none" | "daily" | "weekly" | "monthly" | "custom";
	reminder?: {
		minutesBefore: number;
		channels: ("browser" | "email" | "sms" | "audio")[];
	}[];
};

type State = {
	events: ScheduleEvent[];
	focusId?: string;
	setEvents: (events: ScheduleEvent[]) => void;
	addEvent: (e: Omit<ScheduleEvent, "id">) => string;
	updateEvent: (id: string, partial: Partial<ScheduleEvent>) => void;
	deleteEvent: (id: string) => void;
	reorderEvents: (ids: string[]) => void;
	setFocusId: (id?: string) => void;
};

export const useScheduleStore = create<State>((set) => ({
	events: [],
	focusId: undefined,
	setEvents: (events) => set({ events }),
	addEvent: (e) => {
		const id = Math.random().toString(36).slice(2);
		set((s) => ({
			events: [...s.events, { ...e, id }],
		}));
		return id;
	},
	updateEvent: (id, partial) =>
		set((s) => ({
			events: s.events.map((ev) => (ev.id === id ? { ...ev, ...partial } : ev)),
		})),
	deleteEvent: (id) =>
		set((s) => ({
			events: s.events.filter((ev) => ev.id !== id),
		})),
	reorderEvents: (ids) =>
		set((s) => ({
			events: ids
				.map((id) => s.events.find((ev) => ev.id === id)!)
				.filter(Boolean),
		})),
	setFocusId: (id) => set({ focusId: id }),
}));
