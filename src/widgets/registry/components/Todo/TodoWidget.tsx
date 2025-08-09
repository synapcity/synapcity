"use client";

import { useCallback, useMemo, useState } from "react";
import { cn } from "@/utils";
import { Card } from "@/components/atoms/ui/card";
import { Separator } from "@/components/atoms/ui/separator";
import { Input } from "@/components/atoms/ui/input";
import { Button } from "@/components/atoms/ui/button";
import { Checkbox } from "@/components/atoms/ui/checkbox";

type TodoProps = {
  title: string;
  emptyState: string;
  showCompleted: boolean;
};

type TodoSettings = {
  groupBy: "none" | "tag" | "priority";
  sortBy: "createdAt" | "updatedAt" | "dueDate";
};

type Props = {
  widgetId: string;
  props: TodoProps;
  settings: TodoSettings;
  className?: string;
};

type Item = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
  dueDate?: number;
};

export function TodoWidget({ widgetId, props, settings, className }: Props) {
  const { title, emptyState, showCompleted } = props;
  const { sortBy } = settings;

  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState("");

  const addItem = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    const now = Date.now();
    setItems((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        text,
        completed: false,
        createdAt: now,
        updatedAt: now,
      },
    ]);
    setInput("");
  }, [input]);

  const toggleItem = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, completed: !it.completed, updatedAt: Date.now() }
          : it
      )
    );
  }, []);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortBy === "createdAt") return b.createdAt - a.createdAt;
      if (sortBy === "updatedAt") return b.updatedAt - a.updatedAt;
      if (sortBy === "dueDate")
        return (a.dueDate ?? Infinity) - (b.dueDate ?? Infinity);
      return 0;
    });
  }, [items, sortBy]);

  const visibleItems = useMemo(() => {
    return showCompleted ? sortedItems : sortedItems.filter((i) => !i.completed);
  }, [sortedItems, showCompleted]);

  return (
    <Card
      className={cn("h-full w-full p-3 flex flex-col", className)}
      data-widget-id={widgetId}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addItem();
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-7 w-32"
            placeholder="Add"
          />
          <Button type="submit" size="sm">
            Add
          </Button>
        </form>
      </div>
      <Separator className="mb-2" />
      <div className="flex-1 space-y-2 overflow-auto">
        {visibleItems.length ? (
          visibleItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Checkbox
                checked={item.completed}
                onCheckedChange={() => toggleItem(item.id)}
              />
              <span
                className={cn(
                  "text-sm",
                  item.completed && "line-through text-muted-foreground"
                )}
              >
                {item.text}
              </span>
            </div>
          ))
        ) : (
          <div className="text-sm text-muted-foreground">{emptyState}</div>
        )}
      </div>
    </Card>
  );
}
