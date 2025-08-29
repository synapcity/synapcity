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
import { findContainer, SortableListItem, DroppableList } from "@/components/sortable/helpers";

type Task = { id: string; text: string };

export default function MultiSelectTodoList() {
  // State for tasks in two lists
  const [lists, setLists] = useState<{ [key: string]: Task[] }>({ todo: [], done: [] });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // New task input & clone/move toggle
  const [newTaskText, setNewTaskText] = useState("");
  const [cloneMode, setCloneMode] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // Add new task into "todo"
  const handleAdd = () => {
    const text = newTaskText.trim();
    if (!text) return;
    const newTask: Task = { id: Date.now().toString(), text };
    setLists((prev) => ({ ...prev, todo: [...prev.todo, newTask] }));
    setNewTaskText("");
  };

  const handleDragStart = ({ active }: { active: Active }) => {
    const id = active.id as string;
    setActiveId(id);
    if (!selectedIds.includes(id)) {
      setSelectedIds([id]);
    }
  };

  // Drag end: move or clone all selected items
  const handleDragEnd = ({ active, over }: { active: Active; over: Over | null }) => {
    const activeId = active.id as string;
    const overId = over?.id as string;
    setActiveId(null);
    if (!overId) {
      setSelectedIds([]);
      return;
    }

    const from = findContainer(lists, activeId)!;
    const to = findContainer(lists, overId) ?? (lists[overId] ? overId : null);
    if (!to) {
      setSelectedIds([]);
      return;
    }

    const sourceItems = lists[from];
    const destItems = lists[to];
    let destIndex = destItems.findIndex((t) => t.id === overId);
    if (destIndex < 0) destIndex = destItems.length;

    // Determine items to move or clone
    const movingIds = selectedIds.includes(activeId) ? selectedIds : [activeId];

    if (from === to && !cloneMode) {
      // Reorder within same list: move first selected only
      const oldIndex = sourceItems.findIndex((t) => t.id === activeId);
      if (oldIndex !== destIndex) {
        setLists((prev) => ({
          ...prev,
          [from]: arrayMove(prev[from], oldIndex, destIndex),
        }));
      }
    } else {
      // For each id, either clone or move
      setLists((prev) => {
        const newLists = { ...prev };
        movingIds.forEach((id) => {
          const task = prev[from].find((t) => t.id === id)!;
          if (cloneMode) {
            // insert clone
            const clone: Task = { id: Date.now().toString() + Math.random(), text: task.text };
            newLists[to] = [
              ...newLists[to].slice(0, destIndex),
              clone,
              ...newLists[to].slice(destIndex),
            ];
          } else {
            // move
            newLists[from] = newLists[from].filter((t) => t.id !== id);
            newLists[to] = [
              ...newLists[to].slice(0, destIndex),
              task,
              ...newLists[to].slice(destIndex),
            ];
          }
        });
        return newLists;
      });
    }

    // clear selection
    setSelectedIds([]);
  };

  const renderSortableItem = (task: Task) => {
    const isSelected = selectedIds.includes(task.id);
    return (
      <SortableListItem
        key={task.id}
        id={task.id}
        className={`${isSelected ? "ring-2 ring-blue-500" : ""} p-2 mb-2 bg-white rounded shadow cursor-move`}
        onClick={(e) => {
          if (e.shiftKey || e.ctrlKey || e.metaKey) {
            e.stopPropagation();
            setSelectedIds((prev) =>
              prev.includes(task.id) ? prev.filter((x) => x !== task.id) : [...prev, task.id]
            );
          }
        }}
      >
        {task.text}
      </SortableListItem>
    );
  };

  return (
    <div className="p-4">
      {/* Input & controls */}
      <div className="mb-4 flex items-center gap-4">
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
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={cloneMode} onChange={() => setCloneMode((v) => !v)} />
          Clone Mode
        </label>
      </div>

      {/* Draggable lists */}
      <div className="grid grid-cols-2 gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setSelectedIds([])}
        >
          {Object.keys(lists).map((containerId) => (
            <DroppableList key={containerId} id={containerId}>
              <h3 className="font-semibold mb-2 capitalize text-lg">{containerId}</h3>
              <SortableContext
                items={lists[containerId].map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                {lists[containerId].map((task) => renderSortableItem(task))}
              </SortableContext>
            </DroppableList>
          ))}

          <DragOverlay dropAnimation={null}>
            {(selectedIds.length > 1 ? selectedIds : activeId ? [activeId] : []).map((id) => (
              <div key={id} className="p-2 mb-1 bg-white rounded shadow">
                {lists[findContainer(lists, id)!].find((t) => t.id === id)?.text}
              </div>
            ))}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
