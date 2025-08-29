// components/forms/DateTimeNLField.tsx
"use client";

import * as React from "react";
import { parseDate } from "chrono-node";
import { CalendarIcon, Clock } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/atoms/ui/form";
import { Button, Input } from "@/components";
import { Calendar } from "@/components/atoms/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/ui/popover";

function formatDateLong(date?: Date) {
  if (!date) return "";
  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function formatTime(date?: Date) {
  if (!date) return "";
  return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: true });
}

// "2:30pm", "14:30", "230pm", "2pm", "14"
function parseTime(text: string): { h: number; m: number } | null {
  const t = text.trim().toLowerCase().replace(/\s+/g, "");
  if (!t) return null;
  const am = t.includes("am");
  const pm = t.includes("pm");
  const clean = t.replace(/am|pm/g, "");

  let h = 0,
    m = 0;
  if (clean.includes(":")) {
    const [hh, mm] = clean.split(":");
    h = Number(hh);
    m = Number(mm || 0);
  } else if (clean.length <= 2) {
    h = Number(clean);
  } else if (clean.length === 3) {
    h = Number(clean.slice(0, 1));
    m = Number(clean.slice(1));
  } else if (clean.length === 4) {
    h = Number(clean.slice(0, 2));
    m = Number(clean.slice(2));
  } else return null;

  if (Number.isNaN(h) || Number.isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) return null;
  if (am || pm) {
    if (h === 12) h = 0; // 12am -> 0
    if (pm) h += 12; // 2pm -> 14
    if (h === 24) h = 12; // 12pm -> 12
  }
  return { h, m };
}

function setTime(base: Date | undefined, h: number, m: number): Date {
  const d = base ? new Date(base) : new Date();
  d.setHours(h, m, 0, 0);
  return d;
}
function buildTimeGrid(step = 15) {
  const out: string[] = [];
  for (let minutes = 0; minutes < 24 * 60; minutes += step) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const d = new Date();
    d.setHours(h, m, 0, 0);
    out.push(formatTime(d));
  }
  return out;
}
const TIME_OPTIONS = buildTimeGrid(15);

type PublicProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  placeholderDate?: string;
  placeholderTime?: string;
  allowEmpty?: boolean;
  withTime?: boolean;
};

export function DateTimeNLField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholderDate = "e.g. Tomorrow or next Friday",
  placeholderTime = "e.g. 2:30pm",
  allowEmpty = true,
  withTime = true,
}: PublicProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          <FormLabel>{label}</FormLabel>
          <DateTimeNLInputs
            value={field.value as Date | undefined}
            onChange={field.onChange}
            placeholderDate={placeholderDate}
            placeholderTime={placeholderTime}
            allowEmpty={allowEmpty}
            withTime={withTime}
          />
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/** Child component where Hooks live (valid per Rules of Hooks) */
function DateTimeNLInputs({
  value,
  onChange,
  placeholderDate,
  placeholderTime,
  allowEmpty,
  withTime,
}: {
  value?: Date;
  onChange: (v?: Date) => void;
  placeholderDate: string;
  placeholderTime: string;
  allowEmpty: boolean;
  withTime: boolean;
}) {
  const [dateOpen, setDateOpen] = React.useState(false);
  const [timeOpen, setTimeOpen] = React.useState(false);
  const [text, setText] = React.useState<string>(value ? formatDateLong(value) : "");
  const [timeText, setTimeText] = React.useState<string>(value ? formatTime(value) : "");
  const [month, setMonth] = React.useState<Date | undefined>(value);

  React.useEffect(() => {
    setText(value ? formatDateLong(value) : "");
    setTimeText(value ? formatTime(value) : "");
    setMonth(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-2">
      {/* Natural language date + calendar */}
      <div className="relative flex gap-2">
        <Input
          value={text}
          placeholder={placeholderDate}
          className="bg-background pr-10"
          onChange={(e) => {
            const v = e.target.value;
            setText(v);
            const parsed = v ? parseDate(v) : undefined;
            if (parsed) {
              const next = value ? new Date(value) : new Date();
              next.setFullYear(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
              onChange(next);
              setMonth(parsed);
            } else if (allowEmpty && v.trim() === "") {
              onChange(undefined);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setDateOpen(true);
            }
          }}
        />
        <Popover open={dateOpen} onOpenChange={setDateOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              tabIndex={-1}
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(d) => {
                if (!d) {
                  if (allowEmpty) onChange(undefined);
                  setDateOpen(false);
                  return;
                }
                const next = value ?? new Date();
                next.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
                onChange(new Date(next));
                setDateOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time input + grid */}
      {withTime && (
        <div className="relative flex gap-2">
          <Input
            value={timeText}
            placeholder={placeholderTime}
            onChange={(e) => {
              const v = e.target.value;
              setTimeText(v);
              const tm = parseTime(v);
              if (tm) {
                const next = setTime(value, tm.h, tm.m);
                onChange(next);
              } else if (allowEmpty && v.trim() === "" && value) {
                const next = setTime(value, 0, 0);
                onChange(next);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setTimeOpen(true);
              }
            }}
          />
          <Popover open={timeOpen} onOpenChange={setTimeOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                tabIndex={-1}
              >
                <Clock className="size-3.5" />
                <span className="sr-only">Select time</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 max-h-64 overflow-auto p-1" align="end">
              <div className="grid grid-cols-1 gap-1">
                {TIME_OPTIONS.map((t) => (
                  <Button
                    key={t}
                    type="button"
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      const tm = parseTime(t)!;
                      const next = setTime(value, tm.h, tm.m);
                      onChange(next);
                      setTimeText(t);
                      setTimeOpen(false);
                    }}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
