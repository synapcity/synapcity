"use client";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableListItem } from "@/components/sortable";

export function SortableList({ items }: { items: string[] }) {
  const [order, setOrder] = useState(items);
  const [activeId, setActive] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActive(active.id as string)}
      onDragEnd={({ active, over }) => {
        setActive(null);
        if (over && active.id !== over.id) {
          setOrder((o) =>
            arrayMove(o, o.indexOf(active.id as string), o.indexOf(over.id as string))
          );
        }
      }}
      onDragCancel={() => setActive(null)}
    >
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        {order.map((id) => (
          <SortableListItem key={id} id={id}>
            {id}
          </SortableListItem>
        ))}
      </SortableContext>

      {/* DragOverlay renders *above* everything else, following the pointer */}
      <DragOverlay dropAnimation={null}>
        {activeId ? (
          <div
            style={{
              padding: "8px 12px",
              background: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              borderRadius: 4,
            }}
          >
            {/* you can even render an <img src="…"/> here */}
            {activeId}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
