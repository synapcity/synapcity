"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function CompletionMetricsWidget() {
  const metrics = [
    { label: "Tasks", completed: 24, total: 32, color: "bg-chart-1" },
    { label: "Notes", completed: 18, total: 20, color: "bg-chart-2" },
    { label: "Projects", completed: 3, total: 5, color: "bg-chart-3" },
  ]

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">This Week</h3>
          <div className="flex items-center gap-1 text-accent">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-medium">+12%</span>
          </div>
        </div>

        <div className="space-y-4">
          {metrics.map((metric) => {
            const percentage = (metric.completed / metric.total) * 100
            return (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-card-foreground">{metric.label}</span>
                  <span className="text-muted-foreground">
                    {metric.completed}/{metric.total}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full ${metric.color} transition-all duration-300`}
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
