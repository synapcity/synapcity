"use client";

import { format, formatDistanceToNow } from "date-fns";

import { useState } from "react";

interface MetaProps {
  createdAt: string;
  updatedAt: string;
}

export function ProgressiveMeta({ createdAt, updatedAt }: MetaProps) {
  const relative = formatDistanceToNow(new Date(updatedAt), { addSuffix: true });
  const exactCreated = format(new Date(createdAt), "MMM d, yyyy, h:mm a");
  const exactUpdated = format(new Date(updatedAt), "MMM d, yyyy, h:mm a");
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative text-xs"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="font-medium text-gray-300">{relative}</div>
      <div
        className={`
          absolute top-full left-0 mt-1 w-max rounded-md p-2 bg-(--background-200) text-(--foreground) text-[10px] shadow-lg transition-opacity duration-150
          ${hover ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <div className="whitespace-nowrap">Created: {exactCreated}</div>
        <div className="whitespace-nowrap">Updated: {exactUpdated}</div>
      </div>
    </div>
  );
}
