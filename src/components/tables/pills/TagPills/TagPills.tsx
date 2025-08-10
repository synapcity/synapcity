"use client";

import { X } from "lucide-react";

export type TagPill = { label: string; color?: string; value: string };

export function TagPills({
  tags,
  onRemove,
  onClick,
  className = "",
}: {
  tags: TagPill[];
  onRemove?: (value: string) => void;
  onClick?: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex gap-2 flex-wrap ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag.value}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium`}
          style={{
            backgroundColor: tag.color || "var(--accent, #6366f1)",
            color: tag.color ? "#fff" : "var(--accent-foreground, #fff)",
            cursor: onClick ? "pointer" : "default",
            userSelect: "none",
          }}
          onClick={onClick ? () => onClick(tag.value) : undefined}
        >
          {tag.label}
          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(tag.value);
              }}
              className="ml-1 text-xs text-white hover:text-red-400 focus:outline-none"
              title="Remove tag"
              tabIndex={0}
              aria-label="Remove tag"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
