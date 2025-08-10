"use client";

import { useState } from "react";
import { BaseProps, ListItem } from "@/landing-page/types";
import { CardComponent as Card } from "@/landing-page/components/ui/CardComponent/CardComponent";
import { SiLibretranslate } from "react-icons/si";

export const TaskWidget = ({
  title,
  items,
  ...props
}: { title: string; items: ListItem[] } & BaseProps) => {
  const [tasks] = useState(items);
  return (
    <Card
      title={title}
      icon={SiLibretranslate}
      className=" rounded-2xl bg-neutral-950 text-neutral-200 flex flex-col text-sm hover:scale-105 transition-transform justify-start items-start"
      {...props}
    >
      <ul className="space-y-3 flex-1 text-left">
        {tasks.map((task, i) => (
          <li key={i} className="flex items-center gap-2 text-neutral-100">
            ✅ {task.content}
          </li>
        ))}
      </ul>
    </Card>
  );
};
