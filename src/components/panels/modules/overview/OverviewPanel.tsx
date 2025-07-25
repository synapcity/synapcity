"use client";

import { DashboardCard } from "./DashboardCard";

export const OverviewPanel = () => {
  return (
    <div className="p-6 flex gap-6 flex-wrap">
      <DashboardCard title="Today's Focus" accented>
        <p className="text-sm text-muted-foreground">
          Ship MVP and test sidebar flow
        </p>
      </DashboardCard>
      <DashboardCard title="Quick Stats">
        <ul className="space-y-1 leading-relaxed">
          <li>🔥 3-day streak active</li>
          <li>📓 Journal entry saved today</li>
          <li>✅ 2 of 4 high-priority todos completed</li>
        </ul>
      </DashboardCard>
      <DashboardCard title="Mini Widgets">
        <p className="text-sm text-muted-foreground">
          Widget summary cards coming soon...
        </p>
      </DashboardCard>
    </div>
  );
};