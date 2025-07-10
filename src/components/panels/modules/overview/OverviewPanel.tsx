"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/ui/card";
import { Textarea } from "@/components/atoms/ui/textarea"

export const OverviewPanel = () => {
  const [focus, setFocus] = useState("Ship MVP and test sidebar flow");

  return (
    <div className="p-6 flex gap-6 flex-wrap">
      <Card>
        <CardHeader>
          <CardTitle>Today’s Focus</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-2">What are you aiming to complete today?</p>
          <Textarea
            className="text-sm"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            rows={2}
          />
          <div className="mt-2 text-muted-foreground text-xs">
            Refine your intent. Keep it tight and motivating.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-1">
            <li>🎯 2 of 4 high-priority todos completed</li>
            <li>🔥 3-day streak active</li>
            <li>📓 Journal entry saved today</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mini Widgets</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Widget summary cards coming soon...
        </CardContent>
      </Card>
    </div>
  );
};