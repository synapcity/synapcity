"use client"

import { Card } from "@/components/ui/card"
import { Clock } from "lucide-react"

export function TimeSpentWidget() {
  const timeData = [
    { category: "Projects", hours: 12.5, color: "bg-chart-1" },
    { category: "Meetings", hours: 8.2, color: "bg-chart-2" },
    { category: "Research", hours: 6.8, color: "bg-chart-3" },
    { category: "Planning", hours: 4.5, color: "bg-chart-4" },
  ]

  const totalHours = timeData.reduce((sum, item) => sum + item.hours, 0)

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Time Spent</h3>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{totalHours}h</span>
          </div>
        </div>

        <div className="space-y-3">
          {timeData.map((item) => {
            const percentage = (item.hours / totalHours) * 100
            return (
              <div key={item.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${item.color}`} />
                    <span className="text-card-foreground">{item.category}</span>
                  </div>
                  <span className="text-muted-foreground">{item.hours}h</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full ${item.color} transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
