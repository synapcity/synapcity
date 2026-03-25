"use client"

import * as React from "react"
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  GripVerticalIcon,
  PlusIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type ViewMode = "day" | "week" | "month"
type TimeIncrement = 15 | 30 | 60 | 120

interface CalendarEvent {
  id: string
  title: string
  startTime: Date
  endTime: Date
  color: string
  category?: string
}

interface CalendarWidgetProps {
  compact?: boolean
  className?: string
}

const eventColors = [
  { name: "Blue", value: "bg-blue-500/20 border-blue-500 text-blue-400" },
  { name: "Teal", value: "bg-teal-500/20 border-teal-500 text-teal-400" },
  { name: "Purple", value: "bg-purple-500/20 border-purple-500 text-purple-400" },
  { name: "Amber", value: "bg-amber-500/20 border-amber-500 text-amber-400" },
  { name: "Green", value: "bg-green-500/20 border-green-500 text-green-400" },
]

export function CalendarWidget({ compact = false, className }: CalendarWidgetProps) {
  const [viewMode, setViewMode] = React.useState<ViewMode>("day")
  const [timeIncrement, setTimeIncrement] = React.useState<TimeIncrement>(30)
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [events, setEvents] = React.useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Team Standup",
      startTime: new Date(new Date().setHours(9, 0, 0, 0)),
      endTime: new Date(new Date().setHours(9, 30, 0, 0)),
      color: eventColors[0].value,
      category: "Meeting",
    },
    {
      id: "2",
      title: "Deep Work Session",
      startTime: new Date(new Date().setHours(10, 0, 0, 0)),
      endTime: new Date(new Date().setHours(12, 0, 0, 0)),
      color: eventColors[1].value,
      category: "Focus",
    },
    {
      id: "3",
      title: "Lunch Break",
      startTime: new Date(new Date().setHours(12, 0, 0, 0)),
      endTime: new Date(new Date().setHours(13, 0, 0, 0)),
      color: eventColors[3].value,
      category: "Personal",
    },
  ])
  const [draggedEvent, setDraggedEvent] = React.useState<CalendarEvent | null>(null)
  const [isCreating, setIsCreating] = React.useState(false)
  const [createStart, setCreateStart] = React.useState<Date | null>(null)
  const [createEnd, setCreateEnd] = React.useState<Date | null>(null)
  const [dragOffset, setDragOffset] = React.useState(0)

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const workingHours = hours.filter((h) => h >= 6 && h <= 22)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const getTimeSlots = () => {
    const slots: Date[] = []
    const minutesPerSlot = timeIncrement
    const slotsPerHour = 60 / minutesPerSlot

    workingHours.forEach((hour) => {
      for (let i = 0; i < slotsPerHour; i++) {
        const date = new Date(currentDate)
        date.setHours(hour, i * minutesPerSlot, 0, 0)
        slots.push(date)
      }
    })

    return slots
  }

  const getEventPosition = (event: CalendarEvent) => {
    const startHour = event.startTime.getHours()
    const startMinute = event.startTime.getMinutes()
    const endHour = event.endTime.getHours()
    const endMinute = event.endTime.getMinutes()

    const startOffset = (startHour - 6) * 60 + startMinute
    const duration = (endHour - startHour) * 60 + (endMinute - startMinute)

    const pixelsPerMinute = 60 / timeIncrement
    const top = startOffset * pixelsPerMinute
    const height = duration * pixelsPerMinute

    return { top, height }
  }

  const handleTimeSlotClick = (slotTime: Date) => {
    if (!isCreating) {
      setIsCreating(true)
      setCreateStart(slotTime)
      const endTime = new Date(slotTime)
      endTime.setMinutes(endTime.getMinutes() + timeIncrement)
      setCreateEnd(endTime)
    }
  }

  const handleTimeSlotHover = (slotTime: Date) => {
    if (isCreating && createStart) {
      const endTime = new Date(slotTime)
      endTime.setMinutes(endTime.getMinutes() + timeIncrement)
      if (endTime > createStart) {
        setCreateEnd(endTime)
      }
    }
  }

  const handleCreateEvent = () => {
    if (createStart && createEnd) {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: "New Event",
        startTime: createStart,
        endTime: createEnd,
        color: eventColors[Math.floor(Math.random() * eventColors.length)].value,
      }
      setEvents([...events, newEvent])
    }
    setIsCreating(false)
    setCreateStart(null)
    setCreateEnd(null)
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  const getWeekDays = () => {
    const start = new Date(currentDate)
    start.setDate(start.getDate() - start.getDay())
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start)
      date.setDate(date.getDate() + i)
      return date
    })
  }

  const getMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.startTime.toDateString() === date.toDateString(),
    )
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetTime: Date) => {
    e.preventDefault()
    if (draggedEvent) {
      const duration = draggedEvent.endTime.getTime() - draggedEvent.startTime.getTime()
      const newStart = new Date(targetTime)
      const newEnd = new Date(newStart.getTime() + duration)

      setEvents(
        events.map((event) =>
          event.id === draggedEvent.id
            ? { ...event, startTime: newStart, endTime: newEnd }
            : event,
        ),
      )
      setDraggedEvent(null)
    }
  }

  const timeSlots = getTimeSlots()
  const currentTime = new Date()
  const currentTimeOffset =
    currentTime.getHours() >= 6 && currentTime.getHours() <= 22
      ? ((currentTime.getHours() - 6) * 60 + currentTime.getMinutes()) * (60 / timeIncrement)
      : null

  return (
    <div className={cn("flex flex-col rounded-xl border bg-card shadow-sm", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <CalendarIcon className="size-5 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Schedule</h3>
            {!compact && <p className="text-xs text-muted-foreground">Drag to create or reschedule events</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex rounded-md border">
            {(["day", "week", "month"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  "px-3 py-1 text-xs font-medium capitalize transition-colors first:rounded-l-md last:rounded-r-md",
                  viewMode === mode
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <SettingsIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Time Increment</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[15, 30, 60, 120].map((increment) => (
                <DropdownMenuItem
                  key={increment}
                  onClick={() => setTimeIncrement(increment as TimeIncrement)}
                  className={cn(timeIncrement === increment && "bg-accent")}
                >
                  {increment < 60 ? `${increment} minutes` : `${increment / 60} hour${increment > 60 ? "s" : ""}`}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <Button variant="ghost" size="icon-sm" onClick={() => navigateDate("prev")}>
          <ChevronLeftIcon className="size-4" />
        </Button>
        <div className="text-sm font-medium text-foreground">{formatDate(currentDate)}</div>
        <Button variant="ghost" size="icon-sm" onClick={() => navigateDate("next")}>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>

      {/* Calendar Grid - Day View */}
      {viewMode === "day" && (
        <div className="relative flex-1 overflow-y-auto">
          <div className="relative min-h-[600px]">
            {/* Time Labels */}
            <div className="absolute left-0 top-0 w-16 border-r bg-muted/30">
              {workingHours.map((hour) => (
                <div
                  key={hour}
                  className="border-b px-2 py-1 text-xs text-muted-foreground"
                  style={{ height: `${60 * (60 / timeIncrement)}px` }}
                >
                  {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="ml-16">
              {/* Time Slots */}
              <div className="relative">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    onClick={() => handleTimeSlotClick(slot)}
                    onMouseEnter={() => handleTimeSlotHover(slot)}
                    onMouseUp={handleCreateEvent}
                    className={cn(
                      "border-b border-border/50 cursor-pointer transition-colors hover:bg-muted/30",
                      index % (60 / timeIncrement) === 0 && "border-border",
                    )}
                    style={{ height: `${60}px` }}
                  />
                ))}

                {/* Current Time Indicator */}
                {currentTimeOffset !== null && (
                  <div
                    className="absolute left-0 right-0 z-10 flex items-center"
                    style={{ top: `${currentTimeOffset}px` }}
                  >
                    <div className="size-2 rounded-full bg-red-500" />
                    <div className="h-px flex-1 bg-red-500" />
                  </div>
                )}

                {/* Creating Event Ghost */}
                {isCreating && createStart && createEnd && (
                  <div
                    className="absolute left-2 right-2 z-20 rounded-md border-2 border-dashed border-primary bg-primary/10"
                    style={{
                      top: `${getEventPosition({ id: "", title: "", startTime: createStart, endTime: createEnd, color: "" }).top}px`,
                      height: `${getEventPosition({ id: "", title: "", startTime: createStart, endTime: createEnd, color: "" }).height}px`,
                    }}
                  >
                    <div className="flex h-full items-center justify-center">
                      <PlusIcon className="size-4 text-primary" />
                    </div>
                  </div>
                )}

                {/* Events */}
                {events.map((event) => {
                  const { top, height } = getEventPosition(event)
                  return (
                    <div
                      key={event.id}
                      className={cn(
                        "group absolute left-2 right-2 z-30 cursor-move rounded-md border-l-4 p-2 transition-all hover:shadow-md",
                        draggedEvent?.id === event.id ? "opacity-50" : "",
                        event.color,
                      )}
                      style={{ top: `${top}px`, height: `${height}px` }}
                      draggable
                      onDragStart={(e) => {
                        setDraggedEvent(event)
                        setDragOffset((e.clientY - (top + 64)) % 60)
                      }}
                      onDragOver={handleDragOver}
                      onDrop={(e) => {
                        const grid = e.currentTarget.parentElement
                        if (grid) {
                          const rect = grid.getBoundingClientRect()
                          const y = e.clientY - rect.top - 64
                          const slotIndex = Math.max(0, Math.floor(y / (60 / (60 / timeIncrement))))
                          const targetMinutes = (slotIndex * timeIncrement) % 60
                          const targetHour = 6 + Math.floor((slotIndex * timeIncrement) / 60)
                          const targetDate = new Date(currentDate)
                          targetDate.setHours(targetHour, targetMinutes, 0, 0)
                          handleDrop(e, targetDate)
                        }
                      }}
                      onDragEnd={() => setDraggedEvent(null)}
                    >
                      <div className="flex h-full flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium">{event.title}</p>
                            <div className="flex items-center gap-1 text-xs opacity-80">
                              <ClockIcon className="size-3" />
                              {formatTime(event.startTime)} - {formatTime(event.endTime)}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDeleteEvent(event.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2Icon className="size-3" />
                          </Button>
                        </div>
                        {event.category && (
                          <Badge variant="secondary" className="w-fit text-[10px] px-1.5 py-0">
                            {event.category}
                          </Badge>
                        )}
                      </div>
                      <GripVerticalIcon className="absolute right-1 top-1 size-3 opacity-0 group-hover:opacity-50" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Week View */}
      {viewMode === "week" && (
        <div className="flex-1 overflow-x-auto">
          <div className="inline-flex min-w-full">
            {getWeekDays().map((date, dayIndex) => (
              <div key={dayIndex} className="flex-1 min-w-[200px] border-r last:border-r-0">
                {/* Day Header */}
                <div className="border-b bg-muted/50 px-3 py-2 text-center">
                  <div className="text-xs font-medium text-muted-foreground">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div className={cn(
                    "text-lg font-semibold",
                    date.toDateString() === new Date().toDateString() ? "text-primary" : "text-foreground"
                  )}>
                    {date.getDate()}
                  </div>
                </div>

                {/* Time Slots for Week */}
                <div className="relative min-h-[600px] overflow-y-auto">
                  {workingHours.map((hour) => (
                    <div
                      key={hour}
                      className="border-b border-border/50 relative"
                      style={{ height: `${60 * (60 / timeIncrement)}px` }}
                    >
                      {Array.from({ length: 60 / timeIncrement }).map((_, slotIndex) => {
                        const slotDate = new Date(date)
                        slotDate.setHours(hour, slotIndex * timeIncrement, 0, 0)
                        return (
                          <div
                            key={`${hour}-${slotIndex}`}
                            onClick={() => handleTimeSlotClick(slotDate)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, slotDate)}
                            className="cursor-pointer hover:bg-muted/30 transition-colors h-full"
                            style={{ height: `${60 / (60 / timeIncrement)}px` }}
                          />
                        )
                      })}

                      {/* Events for this hour */}
                      {getEventsForDate(date)
                        .filter((e) => e.startTime.getHours() === hour)
                        .map((event) => {
                          const { top, height } = getEventPosition(event)
                          return (
                            <div
                              key={event.id}
                              className={cn(
                                "group absolute left-1 right-1 z-30 cursor-move rounded-md border-l-4 p-1 text-xs transition-all hover:shadow-md",
                                event.color,
                              )}
                              style={{
                                top: `${top % (60 * (60 / timeIncrement))}px`,
                                height: `${height}px`,
                              }}
                              draggable
                              onDragStart={() => setDraggedEvent(event)}
                              onDragEnd={() => setDraggedEvent(null)}
                            >
                              <p className="truncate font-medium">{event.title}</p>
                              <div className="text-[10px] opacity-80">
                                {formatTime(event.startTime)}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => handleDeleteEvent(event.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 right-0"
                              >
                                <Trash2Icon className="size-2" />
                              </Button>
                            </div>
                          )
                        })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Month View */}
      {viewMode === "month" && (
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {getMonthDays().map((date, index) => (
                <div
                  key={index}
                  className={cn(
                    "min-h-24 rounded-lg border p-2 transition-colors",
                    date === null
                      ? "bg-muted/20"
                      : date.toDateString() === new Date().toDateString()
                        ? "border-primary bg-primary/5"
                        : "border-border/50 hover:bg-muted/30 cursor-pointer",
                  )}
                  onClick={() => date && setCurrentDate(date)}
                >
                  {date && (
                    <>
                      <div className="text-sm font-medium mb-1">{date.getDate()}</div>
                      <div className="space-y-1">
                        {getEventsForDate(date).map((event) => (
                          <div
                            key={event.id}
                            className={cn(
                              "group text-[10px] p-1 rounded truncate relative",
                              event.color,
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                          >
                            <div className="truncate">{event.title}</div>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => handleDeleteEvent(event.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 right-0 h-4 w-4"
                            >
                              <Trash2Icon className="size-2" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t px-4 py-2 bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{events.length} events today</span>
          <span>Click and drag to create events</span>
        </div>
      </div>
    </div>
  )
}
