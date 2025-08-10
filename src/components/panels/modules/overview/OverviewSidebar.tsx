"use client";

import { useState } from "react";
import { Button } from "@/components";
import { Textarea } from "@/components/atoms/ui/textarea";

export const OverviewSidebar = () => {
  const [journal, setJournal] = useState("Feeling focused but kind of rushed...");
  const [flow, setFlow] = useState({ start: true, reflect: false, end: false });

  const toggleFlow = (key: keyof typeof flow) =>
    setFlow((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="px-4 py-6 space-y-6 text-sm text-muted-foreground">
      {/* Flow Section */}
      <section>
        <h5 className="text-foreground font-semibold text-xs tracking-wide uppercase mb-2">
          Your Flow
        </h5>
        <ul className="space-y-1">
          {(["start", "reflect", "end"] as const).map((key) => (
            <li key={key}>
              <Button
                variant={flow[key] ? "outline" : "ghost"}
                size="sm"
                className="justify-start w-full text-sm"
                onClick={() => toggleFlow(key)}
              >
                {flow[key] ? "✅" : "⭕"} Start Day
              </Button>
            </li>
          ))}
        </ul>
      </section>

      {/* Journal Section */}
      <section>
        <h5 className="text-foreground font-semibold text-xs tracking-wide uppercase mb-2">
          Journal
        </h5>
        <p className="text-xs mb-1">Latest entry:</p>
        <blockquote className="italic rounded-sm border-l-2 pl-3 border-border text-foreground/80 mb-2">
          {journal}
        </blockquote>
        <Textarea
          className="text-sm leading-snug px-3 py-2 resize-none rounded-md border border-border bg-muted/5 focus-visible:ring-accent focus-visible:border-accent"
          rows={3}
          onBlur={(e) => setJournal(e.target.value)}
        />
        <Button
          variant="ghost"
          size="sm"
          className="w-full border border-border mt-2 rounded-md text-xs hover:bg-muted/10"
        >
          Add to Journal
        </Button>
      </section>

      {/* Schedule Section */}
      <section>
        <h5 className="text-foreground font-semibold text-xs tracking-wide uppercase mb-2">
          Today
        </h5>
        <ul className="space-y-1 text-muted-foreground font-medium text-sm">
          <li>🕒 10:00 AM – Standup</li>
          <li>🎯 Push layout refactor</li>
          <li>📞 2:00 PM – Call with Sam</li>
        </ul>
      </section>

      {/* Quote Section */}
      <section>
        <h5 className="text-foreground font-semibold text-xs tracking-wide uppercase mb-2">
          Quote of the Day
        </h5>
        <blockquote className="italic text-muted-foreground">
          “Focus is the art of knowing what to ignore.” — James Clear
        </blockquote>
      </section>

      {/* Stats Section */}
      <section className="pt-3 border-t border-border">
        <h5 className="text-foreground font-semibold text-xs tracking-wide uppercase mb-2">
          Stats
        </h5>
        <ul className="space-y-1 text-foreground">
          <li>🔥 3-day streak</li>
          <li>✅ 60% goals completed</li>
          <li>📊 Mood: 4.2 / 5</li>
        </ul>
      </section>
    </div>
  );
};
