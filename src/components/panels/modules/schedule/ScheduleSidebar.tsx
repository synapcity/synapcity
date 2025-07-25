"use client";
import { useState } from "react";
import { Active, DndContext, Over, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ExpandableEventMiniCard } from "./components/events/ExpandableEventMiniCard";
import { useScheduleStore } from "@/stores/scheduleStore";
import { PlusIcon } from "lucide-react";

export function ScheduleSidebar() {
  const { events, focusId, updateEvent, reorderEvents, setFocusId, addEvent } = useScheduleStore();
  const [openId, setOpenId] = useState<string | null>(null);

  // DnD order
  const [order, setOrder] = useState(events.map(e => e.id));
  // Sync order with store if events change
  if (order.length !== events.length) setOrder(events.map(e => e.id));

  const now = new Date();
  const todayIso = now.toISOString().slice(0, 10);

  // Only show today's events in sidebar
  const todayEvents = order.map(id => events.find(e => e.id === id))
    .filter(Boolean)
    .filter(e => e!.start.slice(0, 10) === todayIso) as typeof events;

  const past = todayEvents.filter(e => !e.done && new Date(e.end ?? e.start) < now);
  const future = todayEvents.filter(e => !e.done && new Date(e.start) >= now);
  const done = todayEvents.filter(e => e.done);

  const [showPast, setShowPast] = useState(false);
  const [showDone, setShowDone] = useState(false);

  // DnD
  function handleDragEnd({ active, over }: { active: Active; over: Over | null }) {
    if (!over || active.id === over.id) return;
    const oldIdx = order.indexOf(active.id.toString());
    const newIdx = order.indexOf(over.id.toString());
    const newOrder = arrayMove(order, oldIdx, newIdx);
    setOrder(newOrder);
    reorderEvents(newOrder);
  }

  function handleAdd() {
    addEvent({
      title: "New Event",
      start: new Date().toISOString(),
      end: undefined,
      tags: [],
      resources: [],
      done: false,
      notes: "",
    });
  }

  return (
    <aside className="flex flex-col gap-3 size-full max-w-xs min-w-[240px] py-4 px-2 overflow-y-auto">
      {/* Add Event */}
      <button
        onClick={handleAdd}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-(--primary-background) text-(--primary-foreground) font-semibold shadow hover:bg-primary/90 transition w-full mb-2"
      >
        <PlusIcon className="w-4 h-4" />
        Add Event
      </button>
      {/* Past Events Collapsed */}
      {past.length > 0 && (
        <div>
          <button
            className="w-full text-xs text-[var(--primary-foreground)] hover:text-(--primary-background) font-medium mb-1"
            onClick={() => setShowPast(p => !p)}
          >
            {showPast ? "Hide Past Events" : `Show Past Events (${past.length})`}
          </button>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={past.map(e => e.id)} strategy={verticalListSortingStrategy}>
              {showPast && (
                <div className="flex flex-col gap-2 mb-2">
                  {past.map(e => (
                    <ExpandableEventMiniCard
                      key={e.id}
                      event={e}
                      open={openId === e.id}
                      onToggle={() => setOpenId(openId === e.id ? null : e.id)}
                      isPast
                    />
                  ))}
                </div>
              )}
            </SortableContext>
          </DndContext>
        </div>
      )}
      {/* Next/Upcoming Events (DnD enabled) */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={future.map(e => e.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {future.length === 0 && (
              <div className="text-xs text-(--foreground) text-center">
                No more events today 🎉
              </div>
            )}
            {future.map((e, i) => (
              <ExpandableEventMiniCard
                key={e.id}
                event={e}
                open={openId === e.id}
                onToggle={() => setOpenId(openId === e.id ? null : e.id)}
                isNext={i === 0}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {/* Done/Completed Events Collapsed */}
      {done.length > 0 && (
        <div className="mt-3">
          <button
            className="w-full text-xs text-muted-foreground hover:text-primary font-medium mb-1"
            onClick={() => setShowDone(d => !d)}
          >
            {showDone ? "Hide Completed" : `Show Completed (${done.length})`}
          </button>
          {showDone && (
            <div className="flex flex-col gap-2 mb-2">
              {done.map(e => (
                <ExpandableEventMiniCard
                  key={e.id}
                  event={e}
                  open={openId === e.id}
                  onToggle={() => setOpenId(openId === e.id ? null : e.id)}
                  isPast
                />
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}