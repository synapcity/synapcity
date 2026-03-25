import { QuickCaptureWidget } from "@/components/widgets/quick-capture-widget"
import { TodaysFocusWidget } from "@/components/widgets/todays-focus-widget"
import { RecentActivityWidget } from "@/components/widgets/recent-activity-widget"
import { StreakCalendarWidget } from "@/components/widgets/streak-calendar-widget"
import { CompletionMetricsWidget } from "@/components/widgets/completion-metrics-widget"
import { TimeSpentWidget } from "@/components/widgets/time-spent-widget"
import { CalendarWidget } from "@/components/widgets/calendar-widget"
import { InboxDrawer } from "@/components/inbox-drawer"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="fixed top-0 right-0 z-50 p-4">
        <InboxDrawer />
      </div>

      <div className="mx-auto max-w-7xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Your personal knowledge base at a glance</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2">
            <QuickCaptureWidget />
          </div>
          <div>
            <TodaysFocusWidget />
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <RecentActivityWidget />
          </div>
          <div>
            <CompletionMetricsWidget />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <CalendarWidget />
          </div>
          <div className="md:col-span-2">
            <StreakCalendarWidget />
          </div>
          <div>
            <TimeSpentWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
