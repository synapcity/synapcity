"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  Active,
  Over,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { SortableListItem, DroppableList, findContainer } from "@/components/sortable";

type Task = { id: string; text: string };

export default function SortableTodoList() {
  const [lists, setLists] = useState<{ [key: string]: Task[] }>({
    todo: [],
    done: [],
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [newTaskText, setNewTaskText] = useState("");

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleAdd = () => {
    const text = newTaskText.trim();
    if (!text) return;
    const newTask: Task = { id: Date.now().toString(), text };
    setLists((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
    setNewTaskText("");
  };

  const handleDragStart = ({ active }: { active: Active }) => {
    setActiveId(active.id as string);
  };

  const handleDragEnd = ({ active, over }: { active: Active; over: Over | null }) => {
    const activeId = active.id as string;
    const overId = over?.id as string;
    setActiveId(null);
    if (!overId) return;

    const from = findContainer(lists, activeId)!;
    const to = findContainer(lists, overId) ?? (lists[overId] ? overId : null);
    if (!to) return;

    const sourceItems = lists[from];
    const destItems = lists[to];
    let destIndex = destItems.findIndex((t) => t.id === overId);
    if (destIndex < 0) destIndex = destItems.length;

    if (from === to) {
      const oldIndex = sourceItems.findIndex((t) => t.id === activeId);
      if (oldIndex !== destIndex) {
        const newOrder = arrayMove(sourceItems, oldIndex, destIndex);
        setLists((prev) => ({ ...prev, [from]: newOrder }));
      }
    } else {
      const movingTask = sourceItems.find((t) => t.id === activeId)!;
      const newSource = sourceItems.filter((t) => t.id !== activeId);
      const newDest = [...destItems.slice(0, destIndex), movingTask, ...destItems.slice(destIndex)];
      setLists((prev) => ({
        ...prev,
        [from]: newSource,
        [to]: newDest,
      }));
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Enter a new task"
          className="flex-1 p-2 border rounded-l"
        />
        <button onClick={handleAdd} className="px-4 bg-blue-500 text-white rounded-r">
          Add
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          {Object.keys(lists).map((containerId) => (
            <DroppableList key={containerId} id={containerId}>
              <h3 className="font-semibold mb-2 capitalize">{containerId}</h3>
              <SortableContext
                items={lists[containerId].map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                {lists[containerId].map((task) => (
                  <SortableListItem key={task.id} id={task.id}>
                    {task.text}
                  </SortableListItem>
                ))}
              </SortableContext>
            </DroppableList>
          ))}

          <DragOverlay dropAnimation={null}>
            {activeId ? (
              <div className="p-2 bg-white rounded shadow">
                {lists[findContainer(lists, activeId)!].find((t) => t.id === activeId)?.text}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
