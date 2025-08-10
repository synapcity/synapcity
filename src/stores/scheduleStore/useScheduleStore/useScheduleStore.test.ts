import { create } from "zustand";
import { persist } from "zustand/middleware";
import { scheduleStoreInitializer, State, useScheduleStore } from "./useScheduleStore";

describe("useScheduleStore", () => {
  beforeEach(() => {
    useScheduleStore.setState({ events: [], focusId: undefined });
  });

  it("generates unique, valid UUIDs for added events", () => {
    const { addEvent } = useScheduleStore.getState();
    const ids = new Set<string>();
    const sample = { title: "test", start: new Date().toISOString() };
    for (let i = 0; i < 1000; i++) {
      const id = addEvent(sample);
      expect(typeof id).toBe("string");
      expect(id).toHaveLength(36);
      expect(id).toMatch(/^[0-9a-f-]{36}$/);
      ids.add(id);
    }
    expect(ids.size).toBe(1000);
  });

  it("allows event operations using UUID ids", () => {
    const { addEvent, updateEvent, deleteEvent, reorderEvents } = useScheduleStore.getState();
    const base = { start: new Date().toISOString() };
    const id1 = addEvent({ ...base, title: "one" });
    const id2 = addEvent({ ...base, title: "two" });

    updateEvent(id1, { title: "updated" });
    expect(useScheduleStore.getState().events.find((e) => e.id === id1)?.title).toBe("updated");

    reorderEvents([id2, id1]);
    expect(useScheduleStore.getState().events.map((e) => e.id)).toEqual([id2, id1]);

    deleteEvent(id1);
    expect(useScheduleStore.getState().events.find((e) => e.id === id1)).toBeUndefined();
  });
});

describe("useScheduleStore persistence", () => {
  beforeEach(() => {
    useScheduleStore.setState({ events: [], focusId: undefined });
    useScheduleStore.persist?.clearStorage();
  });

  it("persists events across reloads", async () => {
    const start = new Date().toISOString();
    const id = useScheduleStore.getState().addEvent({ title: "Test", start });
    expect(useScheduleStore.getState().events).toHaveLength(1);

    // Create a fresh store to simulate a reload
    const newStore = create<State>()(
      persist(scheduleStoreInitializer, { name: "schedule-events" })
    );
    await newStore.persist?.rehydrate();
    const events = newStore.getState().events;
    expect(events).toHaveLength(1);
    expect(events[0].id).toBe(id);
    expect(events[0].title).toBe("Test");
  });

  it("restores focusId across reloads", async () => {
    const start = new Date().toISOString();
    useScheduleStore.getState().addEvent({ title: "First", start });
    const secondId = useScheduleStore.getState().addEvent({ title: "Second", start });
    useScheduleStore.getState().setFocusId(secondId);

    const newStore = create<State>()(
      persist(scheduleStoreInitializer, { name: "schedule-events" })
    );
    await newStore.persist?.rehydrate();
    const focusId = newStore.getState().focusId;
    expect(focusId).toBe(secondId);
    expect(newStore.getState().events.some((ev) => ev.id === focusId)).toBe(true);
  });
});
