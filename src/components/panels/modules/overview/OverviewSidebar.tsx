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

      <div>
        <h5 className="font-semibold mb-1">Today</h5>
        <ul className="space-y-1">
          <li>🕒 10:00 AM – Standup</li>
          <li>🎯 Push layout refactor</li>
          <li>📞 2:00 PM – Call with Sam</li>
        </ul>
      </div>

      <div>
        <h5 className="font-semibold mb-1">Quote of the Day</h5>
        <blockquote className="italic text-muted-foreground">
          “Focus is the art of knowing what to ignore.” — James Clear
        </blockquote>
      </div>

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