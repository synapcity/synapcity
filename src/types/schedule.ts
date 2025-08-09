// schemas/schedule.ts
import { ResourceSchema } from "@/stores";
import { z } from "zod";

/** Accepts Date | string | number at runtime -> outputs Date */
const optDate = z.coerce.date().optional();

export const ScheduleTagSchema = z.object({
  label: z.string().min(1, "Tag label required"),
  value: z.string().min(1, "Tag value required"),
  color: z.string().optional(),
});

export type ScheduleTag = z.infer<typeof ScheduleTagSchema>
export const LinkedResourceSchema = z.object({
  label: z.string().min(1),
  type: z.enum(["note", "dashboard", "widget"]),
  resourceId: z.string().min(1),
});

export const ReminderSchema = z.object({
  minutesBefore: z.number().int().min(0).max(7 * 24 * 60).default(10),
  channels: z.array(z.enum(["browser", "email", "sms", "audio"])).min(1).default(["browser"]),
});

export const ScheduleEventInputSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(200),
    start: optDate,            // optional
    end: optDate,              // optional
    allDay: z.boolean().default(false),
    tags: z.array(ScheduleTagSchema).default([]),
    resources: z.array(LinkedResourceSchema).default([]),
    notes: z.array(z.string()).default([]),
    location: z.string().optional(),
    done: z.boolean().default(false),
    recurring: z.enum(["none", "daily", "weekly", "monthly", "custom"]).default("none"),
    color: z.string().optional(),
    icon: z.string().optional(),
    isFocus: z.boolean().default(false),
  })
  .refine((d) => !(d.start && d.end) || d.end >= d.start, {
    message: "End must be after start",
    path: ["end"],
  });
export const ScheduleEventSchema = ResourceSchema(ScheduleEventInputSchema)

	export type ScheduleEvent = z.infer<typeof ScheduleEventSchema>;
export type ScheduleEventFormValues = z.infer<typeof ScheduleEventInputSchema>;
export type ScheduleEventFormInput = z.input<typeof ScheduleEventInputSchema>;
	export type ScheduleEventPayload = {
  title: string;
  start?: string;
  end?: string;
  allDay: boolean;
  tags: ScheduleTag[];
  resources: { label: string; type: "note" | "dashboard" | "widget"; resourceId: string }[];
  notes: string[]; // kept as array here; we’ll join for the store
  location?: string;
  done: boolean;
  recurring: "none" | "daily" | "weekly" | "monthly" | "custom";
  color?: string;
  icon?: string;
  isFocus: boolean;
};

	// Helper to convert form values to your payload type
export function toEventPayload(data: ScheduleEventFormValues): ScheduleEventPayload {
  return {
    title: data.title,
    start: data.start?.toISOString(),
    end: data.end ? data.end.toISOString() : undefined,
    allDay: data.allDay,
    tags: data.tags,
    resources: data.resources,
    notes: data.notes,
    location: data.location,
    done: data.done,
    recurring: data.recurring,
    color: data.color,
    icon: data.icon,
    isFocus: data.isFocus,
  };
}

export type ScheduleEventInput = z.infer<typeof ScheduleEventInputSchema>;
export type ScheduleEventInputRaw = z.input<typeof ScheduleEventInputSchema>; // pre-coercion (ISO ok)
