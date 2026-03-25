"use client"

import { Card } from "@/components/ui/card"
import { Flame } from "lucide-react"

export function StreakCalendarWidget() {
  // Generate last 12 weeks of data
  const weeks = 12
  const daysPerWeek = 7
  const today = new Date()

  const generateActivityData = () => {
    const data = []
    for (let week = weeks - 1; week >= 0; week--) {
      const weekData = []
      for (let day = 0; day < daysPerWeek; day++) {
        const date = new Date(today)
        date.setDate(date.getDate() - (week * 7 + (6 - day)))
        const activity = Math.random()
        weekData.push({
          date,
          level: activity > 0.7 ? 4 : activity > 0.5 ? 3 : activity > 0.3 ? 2 : activity > 0.1 ? 1 : 0,
        })
      }
      data.push(weekData)
    }
    return data
  }

  const activityData = generateActivityData()
  const currentStreak = 12

  const levelColors = ["bg-muted", "bg-chart-1/30", "bg-chart-1/50", "bg-chart-1/70", "bg-chart-1"]

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Activity Streak</h3>
          <div className="flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-1.5">
            <Flame className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">{currentStreak} days</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex gap-1">
            {activityData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`h-3 w-3 rounded-sm ${levelColors[day.level]} transition-colors hover:ring-2 hover:ring-primary hover:ring-offset-1`}
                    title={day.date.toLocaleDateString()}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              {levelColors.map((color, index) => (
                <div key={index} className={`h-3 w-3 rounded-sm ${color}`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
