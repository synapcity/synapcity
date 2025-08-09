/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EventActions } from "./EventActions";
import { TagPills } from "../../../../../tables/pills/TagPills/TagPills";
import { EventResourceIcons } from "./EventResourceIcons";
import { CheckCircle2, Clock3 } from "lucide-react";
import { useScheduleStore } from "@/stores/scheduleStore";
import { EditableText } from "@/components/molecules/EditableText";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";
import { EventResourceForm } from "./EventResourceForm";
import { ScheduleEvent } from "@/types/schedule";

type Props = {
  event: any;
  open: boolean;
  onToggle: () => void;
  isNext?: boolean;
  isPast?: boolean;
};

const EventTitle = ({ id, done, title }: { id: string; done: boolean; title: string; }) => {
  const updateEvent = useScheduleStore(s => s.updateEvent);
  return (
    <div className="flex items-center gap-2">
      {done ? (
        <CheckCircle2 className="w-4 h-4 text-green-400" />
      ) : (
        <Clock3 className="w-4 h-4 text-blue-400" />
      )}
      <EditableText
        as="span"
        className="font-semibold text-xs truncate"
        value={title}
        onSave={(newTitle: string) => updateEvent(id, { title: newTitle })}
      />
    </div>
  );
};

const EventDateTime = ({ allDay, end, start, setType }: { allDay: boolean; end?: Date | string; start: Date | string; setType: (type: string) => void; }) => {
  return (
    <div className="text-xs text-(--foreground)" onClick={() => setType("form")}>
      {allDay
        ? "All Day"
        : new Date(start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      {end && <> - {new Date(end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</>}
    </div>
  );
};

const MoreEventInfo = ({ type, event, setType }: { type: string; setType: (type: string | null) => void; event: ScheduleEvent; }) => {
  if (!type) return null;
  return (
    <div className="w-full">
      {type === "note" && <EventActions event={event as any} />}
      {type === "form" && <EventResourceForm event={event} onClose={() => setType(null)} />}
    </div>
  );
};

const EventDetails = ({ event, isPast, setType }: { event: ScheduleEvent; isPast?: boolean; setType: (type: string) => void; }) => {
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex flex-col" onClick={e => e.stopPropagation()}>
        <EventTitle
          id={event.id}
          title={event.title}
          done={(event.done ?? isPast ?? event.end ?? false) as boolean}
        />
        <EventDateTime
          allDay={event.allDay ?? false}
          start={event.start ? new Date(event.start).toISOString() : new Date()}
          end={event.end}
          setType={setType}
        />
        {event.tags && <TagPills tags={event.tags} />}
      </div>
      <EventResourceIcons event={event as any} setType={setType} />
    </div>
  );
};

export function ExpandableEventMiniCard({
  event,
  open,
  onToggle,
  isNext,
  isPast,
}: Props) {
  const [type, setType] = useState<string | null>(null);

  const handleOpenType = (newType: string | null) => {
    setType(newType);
    if (!type) {
      onToggle();
    }
  };

  return (
    <div className="relative w-full px-8">
      <div
        className={`
          flex flex-col max-w-4xl items-center gap-3 rounded-xl border px-4 py-2 shadow-sm cursor-pointer
          bg-(--background) transition-all
          ${open ? "border-primary ring-2 ring-primary/40 z-10" : ""}
          ${isNext ? "border-primary bg-primary/10 shadow" : ""}
          ${isPast ? "opacity-50 hover:opacity-100" : ""}
        `}
        tabIndex={0}
        aria-label={event.title}
        onClick={onToggle}
      >
        <EventDetails event={event} isPast={isPast} setType={handleOpenType} />
        <AnimatePresence initial={false}>
          {open && type && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -5 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="w-full flex flex-col"
            >
              <Separator className="w-full my-4 text-(--foreground)" />
              <MoreEventInfo type={type} event={event} setType={handleOpenType} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}