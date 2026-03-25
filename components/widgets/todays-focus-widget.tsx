"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Circle } from "lucide-react"

interface FocusItem {
  id: string
  title: string
  completed: boolean
  priority: "high" | "medium" | "low"
}

export function TodaysFocusWidget() {
  const [items, setItems] = useState<FocusItem[]>([
    { id: "1", title: "Review Q4 project proposals", completed: true, priority: "high" },
    { id: "2", title: "Update knowledge base structure", completed: false, priority: "high" },
    { id: "3", title: "Team sync at 2pm", completed: false, priority: "medium" },
    { id: "4", title: "Draft blog post outline", completed: false, priority: "low" },
  ])

  const toggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const completedCount = items.filter((item) => item.completed).length
  const progress = (completedCount / items.length) * 100

  const priorityColors = {
    high: "bg-chart-1",
    medium: "bg-chart-2",
    low: "bg-chart-3",
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-card-foreground">Today&apos;s Focus</h3>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs text-muted-foreground">
              {completedCount}/{items.length}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
            >
              <Checkbox checked={item.completed} onCheckedChange={() => toggleItem(item.id)} className="mt-0.5" />
              <div className="flex flex-1 items-center gap-2">
                <Circle className={`h-2 w-2 fill-current ${priorityColors[item.priority]}`} />
                <span
                  className={`text-sm leading-relaxed ${
                    item.completed ? "text-muted-foreground line-through" : "text-card-foreground"
                  }`}
                >
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
