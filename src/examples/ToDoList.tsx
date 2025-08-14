"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { SortableListItem } from "@/components/sortable";

// Main Todo List component with drag-and-drop
export default function SortableTodoList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [newTask, setNewTask] = useState("");

  // Configure pointer sensor
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleAdd = () => {
    const trimmed = newTask.trim();
    if (trimmed) {
      setTasks((prev) => [...prev, trimmed]);
      setNewTask("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Todo List</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a task..."
          className="flex-1 p-2 border rounded-l"
        />
        <button onClick={handleAdd} className="px-4 bg-blue-500 text-white rounded-r">
          Add
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }) => setActiveId(active.id as string)}
        onDragEnd={({ active, over }) => {
          setActiveId(null);
          if (over && active.id !== over.id) {
            setTasks((items) =>
              arrayMove(items, items.indexOf(active.id as string), items.indexOf(over.id as string))
            );
          }
        }}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableListItem key={task} id={task}>
              {task}
            </SortableListItem>
          ))}
        </SortableContext>

        <DragOverlay dropAnimation={null}>
          {activeId ? <div className="p-2 bg-white rounded shadow">{activeId}</div> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
