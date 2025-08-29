"use client";

import ClonableTodoList from "@/examples/ClonableTodoList";
import CloneToggleList from "@/examples/CloneToggleList";
import SortableTodoList from "@/examples/MultipleTodoList";
import MultiSelectTodoList from "@/examples/MultiSelectCloneToggle";

export default function TodosPage() {
  return (
    <div className="min-h-screen size-full">
      <div>
        <h3>Clonable Todo List</h3>
        <ClonableTodoList />
      </div>
      <div>
        <h3>MultiSelect Todo List</h3>
        <MultiSelectTodoList />
      </div>
      <div>
        <h3>Multiple Todo List</h3>
        <SortableTodoList />
      </div>
      <div>
        <h3>Clone Toggle List</h3>

        <CloneToggleList />
      </div>
    </div>
  );
}
