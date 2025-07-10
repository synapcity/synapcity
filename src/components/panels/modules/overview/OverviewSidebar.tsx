// // "use client";

// // import { Switch, Label } from "@/components";
// // import { useState } from "react";
// // import { SidebarGroup, SidebarGroupContent } from "@/components/atoms/ui/sidebar";

// // export const OverviewSidebar = () => {
// //   const [showMood, setShowMood] = useState(true);
// //   const [focusMode, setFocusMode] = useState(false);

// //   return (
// //     <div className="p-4 space-y-6">
// //       <SidebarGroup>
// //         <SidebarGroupContent>
// //           <Label className="text-sm mb-2 block">Options</Label>

// //           <div className="flex items-center justify-between">
// //             <span className="text-sm">Show Mood Tracker</span>
// //             <Switch checked={showMood} onCheckedChange={setShowMood} />
// //           </div>

// //           <div className="flex items-center justify-between mt-3">
// //             <span className="text-sm">Focus Mode</span>
// //             <Switch checked={focusMode} onCheckedChange={setFocusMode} />
// //           </div>
// //         </SidebarGroupContent>
// //       </SidebarGroup>
// //     </div>
// //   );
// // };
// "use client";

// import { useState } from "react";
// import { Button } from "@/components";

// // mock todos
// const todos = [
//   { id: "1", content: "Ship MVP layout refactor", priority: 1, completed: false },
//   { id: "2", content: "Follow up with PM", priority: 1, completed: false },
//   { id: "3", content: "Organize desk", priority: 2, completed: false },
//   { id: "4", content: "Clear Slack inbox", priority: 3, completed: true },
// ];

// export const OverviewSidebar = () => {
//   const [view, setView] = useState<"top" | "all" | "completed">("top");

//   const filtered = (() => {
//     if (view === "top") return todos.filter(t => t.priority === 1 && !t.completed).slice(0, 3);
//     if (view === "completed") return todos.filter(t => t.completed);
//     return todos.filter(t => !t.completed);
//   })();

//   return (
//     <div className="p-4 space-y-6 text-sm">
//       <div>
//         <h4 className="font-semibold mb-1">Today’s Top Tasks</h4>
//         {filtered.length === 0 ? (
//           <p className="text-muted-foreground">Nothing to show right now ✨</p>
//         ) : (
//           <ul className="space-y-1">
//             {filtered.map(todo => (
//               <li key={todo.id}>
//                 {todo.completed ? "✅" : "☐"} {todo.content}
//               </li>
//             ))}
//           </ul>
//         )}
//         <div className="flex gap-2 mt-3">
//           <Button size="xs" variant={view === "top" ? "primary" : "ghost"} onClick={() => setView("top")}>Top</Button>
//           <Button size="xs" variant={view === "all" ? "primary" : "ghost"} onClick={() => setView("all")}>All</Button>
//           <Button size="xs" variant={view === "completed" ? "primary" : "ghost"} onClick={() => setView("completed")}>Done</Button>
//         </div>
//       </div>

//       <div>
//         <h4 className="font-semibold mb-1">Upcoming</h4>
//         <ul className="space-y-1">
//           <li>🕒 10:00 AM – Standup</li>
//           <li>📞 2:00 PM – Strategy Call</li>
//         </ul>
//       </div>

//       <div>
//         <h4 className="font-semibold mb-1">Focus Goals</h4>
//         <ul className="space-y-1">
//           <li>🎯 Ship new widget system</li>
//           <li>📊 Improve test coverage</li>
//         </ul>
//       </div>

//       <div>
//         <h4 className="font-semibold mb-1">Quote of the Day</h4>
//         <blockquote className="italic text-muted-foreground">
//           “Start where you are. Use what you have. Do what you can.”
//         </blockquote>
//       </div>
//     </div>
//   );
// };
"use client";

import { useState } from "react";
import { Button } from "@/components";
import { Textarea } from "@/components/atoms/ui/textarea"

export const OverviewSidebar = () => {
  const [journal, setJournal] = useState("Feeling focused but kind of rushed...");
  const [flow, setFlow] = useState({ start: true, reflect: false, end: false });

  const toggleFlow = (key: keyof typeof flow) =>
    setFlow((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="px-4 space-y-6 text-sm">
      {/* Daily Flow */}
      <div>
        <h5 className="font-semibold mb-1">Your Flow</h5>
        <ul className="space-y-1">
          <li>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start w-full"
              onClick={() => toggleFlow("start")}
            >
              {flow.start ? "✅" : "⭕"} Start Day
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start w-full"
              onClick={() => toggleFlow("reflect")}
            >
              {flow.reflect ? "✅" : "⭕"} Reflect
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start w-full"
              onClick={() => toggleFlow("end")}
            >
              {flow.end ? "✅" : "⭕"} End of Day
            </Button>
          </li>
        </ul>
      </div>

      {/* Journal Quick Entry */}
      <div>
        <h5 className="font-semibold mb-1">Journal</h5>
        <p className="text-muted-foreground mb-1">Latest entry:</p>
        <blockquote className="italic mb-2">{journal}</blockquote>
        <Textarea
          placeholder="What’s on your mind?"
          rows={3}
          className="text-sm"
          onChange={(e) => setJournal(e.target.value)}
        />
        <Button variant="outline" size="sm" className="mt-2 w-full">
          Add to Journal
        </Button>
      </div>

      {/* Today Timeline */}
      <div>
        <h5 className="font-semibold mb-1">Today</h5>
        <ul className="space-y-1">
          <li>🕒 10:00 AM – Standup</li>
          <li>🎯 Push layout refactor</li>
          <li>📞 2:00 PM – Call with Sam</li>
        </ul>
      </div>

      {/* Quote */}
      <div>
        <h5 className="font-semibold mb-1">Quote of the Day</h5>
        <blockquote className="italic text-muted-foreground">
          “Focus is the art of knowing what to ignore.” — James Clear
        </blockquote>
      </div>

      {/* Stats */}
      <div className="pt-2 border-t">
        <h5 className="font-semibold mb-1">Stats</h5>
        <ul className="space-y-1">
          <li>🔥 3-day streak</li>
          <li>✅ 60% goals completed</li>
          <li>📊 Mood: 4.2 / 5</li>
        </ul>
      </div>
    </div>
  );
};