// "use client";

// import { Progress } from "@/components/atoms/ui/progress";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/ui/card";
// import { useState } from "react";
// import { Button } from "@/components";
// import { format } from "date-fns";

// export const OverviewPanel = () => {
//   const [progress, setProgress] = useState(40);

//   return (
//     <div className="p-4 space-y-6">
//       <header className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold">Overview</h2>
//         <span className="text-sm text-muted-foreground">{format(new Date(), "EEEE, MMMM do")}</span>
//       </header>

//       <Card>
//         <CardHeader>
//           <CardTitle>Daily Focus</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <ul className="list-disc pl-4 text-sm space-y-1">
//             <li>Write at least one journal entry</li>
//             <li>Review today’s top goal</li>
//             <li>Check in with team at 2pm</li>
//           </ul>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Progress Tracker</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           <Progress value={progress} />
//           <div className="flex justify-between text-sm">
//             <span>{progress}%</span>
//             <Button size="sm" variant="outline" onClick={() => setProgress((p) => (p + 10) % 110)}>Add Progress</Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };
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