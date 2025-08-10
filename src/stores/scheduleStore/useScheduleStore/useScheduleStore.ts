import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

const generateId = (): string => {
  const cryptoObj = globalThis.crypto;
  if (cryptoObj?.randomUUID) {
    return cryptoObj.randomUUID();
  }
  if (cryptoObj?.getRandomValues) {
    const bytes = new Uint8Array(16);
    cryptoObj.getRandomValues(bytes);
    // Per RFC 4122 section 4.4
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
    return (
      `${hex.slice(0, 4).join("")}` +
      `-${hex.slice(4, 6).join("")}` +
      `-${hex.slice(6, 8).join("")}` +
      `-${hex.slice(8, 10).join("")}` +
      `-${hex.slice(10).join("")}`
    );
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
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

export type State = {
  events: ScheduleEvent[];
  focusId?: string;
  setEvents: (events: ScheduleEvent[]) => void;
  addEvent: (e: Omit<ScheduleEvent, "id">) => string;
  updateEvent: (id: string, partial: Partial<ScheduleEvent>) => void;
  deleteEvent: (id: string) => void;
  reorderEvents: (ids: string[]) => void;
  setFocusId: (id?: string) => void;
};

export const scheduleStoreInitializer: StateCreator<State> = (set) => ({
  events: [],
  focusId: undefined,
  setEvents: (events) => set({ events }),
  addEvent: (e) => {
    const id = generateId();
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
      events: ids.map((id) => s.events.find((ev) => ev.id === id)!).filter(Boolean),
    })),
  setFocusId: (id) => set({ focusId: id }),
});

export const useScheduleStore = create<State>()(
  persist(scheduleStoreInitializer, { name: "schedule-events" })
);
