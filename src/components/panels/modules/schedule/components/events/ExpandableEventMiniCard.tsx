"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EventActions } from "./EventActions";
import { TagPills } from "../../../../../tables/pills/TagPills/TagPills";
import { CheckCircle2, Clock3 } from "lucide-react";
import type { ScheduleEvent } from "@/stores/scheduleStore";

type Props = {
  event: ScheduleEvent;
  open: boolean;
  onToggle: () => void;
  isNext?: boolean;
  isPast?: boolean;
};

export function ExpandableEventMiniCard({
  event,
  open,
  onToggle,
  isNext,
  isPast,
}: Props) {
  return (
    <div className="relative w-full">
      {/* Card face */}
      <div
        className={`
          flex flex-col gap-1 rounded-xl border px-3 py-2 shadow-sm cursor-pointer
          bg-(--background) transition-all
          ${open ? "border-primary ring-2 ring-primary/40 z-10" : ""}
          ${isNext ? "border-primary bg-primary/10 shadow" : ""}
          ${isPast ? "opacity-50 hover:opacity-100" : ""}
        `}
        tabIndex={0}
        aria-label={event.title}
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          {event.done ? (
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          ) : (
            <Clock3 className="w-4 h-4 text-blue-400" />
          )}
          <span className="font-semibold text-xs truncate">{event.title}</span>
        </div>
        <div className="text-xs text-(--foreground)">
          {event.allDay
            ? "All Day"
            : new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          {event.end && <> - {new Date(event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</>}
        </div>
        {event.tags && <TagPills tags={event.tags} />}
      </div>

      {/* Animated expanded panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -5 }}
            transition={{ duration: 0.17 }}
            className="absolute left-0 right-0 mt-2 bg-(--background) text-(--foreground) border rounded-xl shadow-lg z-[99999] p-4"
            style={{ minWidth: 260, maxWidth: 340 }}
            onClick={e => e.stopPropagation()}
          >
            <EventActions event={event} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
