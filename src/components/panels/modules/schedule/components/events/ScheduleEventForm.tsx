/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";

import { Button, Input, UITextarea as Textarea } from "@/components";
import { Switch } from "@/components/molecules";
import { Badge } from "@/components/atoms/ui/badge";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/atoms/ui/form";
import { DateTimeNLField } from "./DateTimeNLField";

import {
  ScheduleEventInputSchema,
  toEventPayload,
  type ScheduleEventInput,
} from "@/types/schedule";

import type { ScheduleEvent, ScheduleTag } from "@/types/schedule";
import { z } from "zod";

type FormIn = z.input<typeof ScheduleEventInputSchema>;   // pre-coercion (strings OK)
type FormOut = z.output<typeof ScheduleEventInputSchema>; // post-coercion (Dates)

export const CHANNELS = ["browser", "email", "sms", "audio"] as const;
export type Channel = typeof CHANNELS[number];

/** Robust ISO/number/Date -> Date | undefined */
function toDate(val: unknown): Date | undefined {
  if (!val) return undefined;
  if (val instanceof Date && !isNaN(val.getTime())) return val;
  if (typeof val === "string" || typeof val === "number") {
    const d = new Date(val);
    return isNaN(d.getTime()) ? undefined : d;
  }
  return undefined;
}


export function ScheduleEventForm({
  event,
  onSave,
  onCancel,
}: {
  event?: ScheduleEvent | null;
  onSave: (data: Omit<ScheduleEvent, "id">) => void;
  onCancel?: () => void;
}) {
  // where you build defaults
  const defaults: FormIn = useMemo(
    () => ({
      title: event?.title ?? "",
      start: toDate(event?.start) ?? new Date(Date.now() + 5 * 60 * 1000), // runtime Date (good for your field)
      end: toDate(event?.end),
      allDay: event?.allDay ?? false,
      tags: event?.tags ?? [],
      resources: (event?.resources as any) ?? [],
      notes: [],
      location: event?.location ?? "",
      done: event?.done ?? false,
      recurring: event?.recurring ?? "none",
      color: event?.color,
      icon: event?.icon,
      isFocus: event?.isFocus ?? false,
      reminders: [],
    }),
    [event]
  );


  // useForm — note the 3 generics and defaultValues typed as FormIn
  const form = useForm<FormIn, any, FormOut>({
    resolver: zodResolver(ScheduleEventInputSchema),
    defaultValues: defaults,
    mode: "onBlur",
  });

  // const { fields: reminderFields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: "reminders",
  // });

  // Simple tags input UI
  const [tagDraft, setTagDraft] = useState("");
  function addTag() {
    const value = tagDraft.trim();
    if (!value) return;
    const tag: ScheduleTag = { label: value, value };
    const existing = form.getValues("tags");
    if (!existing?.some((t) => t.value === tag.value)) {
      form.setValue("tags", [...(existing ?? []), tag], { shouldDirty: true, shouldValidate: true });
    }
    setTagDraft("");
  }
  function removeTag(v: string) {
    const next = form.getValues("tags")?.filter((t) => t.value !== v);
    form.setValue("tags", next, { shouldDirty: true, shouldValidate: true });
  }
  async function onSubmit(values: ScheduleEventInput) {
    if (values.allDay && values.start) {
      const s = values.start;
      values.start = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 0, 0, 0);
      if (values.end) {
        const e = values.end;
        values.end = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, 59, 59, 999);
      }
    }
    const payload = toEventPayload(values);
    onSave(payload as any);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input autoFocus placeholder="What are we doing?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start / End — use your working DateTimeNLField signature */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DateTimeNLField
            control={form.control}
            name="start"
            label="Start"
            description="Type natural dates like “tomorrow 3pm” or pick from the calendar."
          />
          <DateTimeNLField
            control={form.control}
            name="end"
            label="End (optional)"
            description="Leave empty for open-ended events."
          />
        </div>

        {/* All day & Focus & Done toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="allDay"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="mt-0">All day</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFocus"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="mt-0">Focus</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="done"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="mt-0">Done</FormLabel>
              </FormItem>
            )}
          />
        </div>

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Optional location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes (simple) */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any extra details..."
                  value={field.value?.join("\n") ?? ""}
                  onChange={(e) => field.onChange(e.target.value.split("\n").filter(Boolean))}
                  rows={3}
                />
              </FormControl>
              <FormDescription>Each line becomes a separate note entry.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag and press Enter"
                  value={tagDraft}
                  onChange={(e) => setTagDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" variant="primary" onClick={addTag}>
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {form.watch("tags")?.map((t) => (
                  <Badge key={t.value} variant="secondary" className="flex items-center gap-2">
                    {t.label}
                    <button type="button" onClick={() => removeTag(t.value)} aria-label={`Remove ${t.label}`}>
                      <Trash2 className="h-3.5 w-3.5 opacity-70" />
                    </button>
                  </Badge>
                ))}
              </div>
              <FormDescription>Use tags to group and filter events.</FormDescription>
            </FormItem>
          )}
        />

        {/* Reminders
        <FormItem>
          <FormLabel>Reminders (local only)</FormLabel>
          <FormDescription>These are collected in the form but not stored in your ScheduleEvent payload.</FormDescription>
          <div className="mt-2 space-y-2">
            {reminderFields.map((field, index) => (
              <div key={field.id} className="flex flex-col sm:flex-row sm:items-center gap-2 rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor={`reminder-${index}-min`} className="text-xs">Minutes before</Label>
                  <Input
                    id={`reminder-${index}-min`}
                    type="number"
                    className="w-24"
                    value={form.watch(`reminders.${index}.minutesBefore`) ?? 10}
                    onChange={(e) =>
                      form.setValue(
                        `reminders.${index}.minutesBefore`,
                        Number(e.target.value || 0),
                        { shouldDirty: true, shouldValidate: true }
                      )
                    }
                    min={0}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {CHANNELS.map((ch) => {
                    const selected = form.watch(`reminders.${index}.channels`) ?? [];
                    const checked = selected.includes(ch as Channel);
                    return (
                      <label key={ch} className="flex items-center gap-2 text-xs">
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(v) => {
                            const next = new Set(selected);
                            if (v) next.add(ch);
                            else next.delete(ch);
                            form.setValue(
                              `reminders.${index}.channels`,
                              Array.from(next) as Channel[],
                              { shouldDirty: true, shouldValidate: true }
                            );
                          }}
                        />
                        {ch}
                      </label>
                    );
                  })}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className="ml-auto"
                  onClick={() => remove(index)}
                  aria-label="Remove reminder"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="primary"
              onClick={() => append({ minutesBefore: 10, channels: ["browser"] })}
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Reminder
            </Button>
          </div>
        </FormItem> */}

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
