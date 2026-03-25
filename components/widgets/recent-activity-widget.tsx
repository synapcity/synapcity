"use client"

import { Card } from "@/components/ui/card"
import { FileText, Edit3, CheckCircle2, MessageSquare } from "lucide-react"

interface Activity {
  id: string
  type: "created" | "edited" | "completed" | "commented"
  title: string
  page: string
  timestamp: string
}

const activities: Activity[] = [
  { id: "1", type: "completed", title: "Finished project roadmap", page: "Projects", timestamp: "2m ago" },
  { id: "2", type: "edited", title: "Updated meeting notes", page: "Meetings", timestamp: "15m ago" },
  { id: "3", type: "commented", title: "Added feedback on design", page: "Design System", timestamp: "1h ago" },
  { id: "4", type: "created", title: "New page: API Documentation", page: "Engineering", timestamp: "2h ago" },
  { id: "5", type: "edited", title: "Revised quarterly goals", page: "Planning", timestamp: "3h ago" },
]

const activityIcons = {
  created: FileText,
  edited: Edit3,
  completed: CheckCircle2,
  commented: MessageSquare,
}

const activityColors = {
  created: "text-chart-2",
  edited: "text-chart-1",
  completed: "text-accent",
  commented: "text-chart-3",
}

export function RecentActivityWidget() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
          <button className="text-xs text-primary hover:underline">View all</button>
        </div>

        <div className="space-y-1">
          {activities.map((activity, index) => {
            const Icon = activityIcons[activity.type]
            return (
              <div
                key={activity.id}
                className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
              >
                <div className={`mt-0.5 ${activityColors[activity.type]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm leading-relaxed text-card-foreground">{activity.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{activity.page}</span>
                    <span>•</span>
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
