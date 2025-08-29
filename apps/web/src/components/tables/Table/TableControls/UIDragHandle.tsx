"use client";

import { Button } from "@/components";
import { useSortable } from "@dnd-kit/sortable";

export function UIDragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="sm"
      isIconOnly
      icon="moreHorizontal"
      tabIndex={0}
      className="size-7 text-(--muted-foreground) bg-(--background) hover:bg-transparent cursor-grab"
    >
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}
