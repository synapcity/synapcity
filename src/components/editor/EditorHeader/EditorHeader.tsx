"use client"

import { useState } from "react";
import { TagPills } from "@/components/tables/pills";

export default function EditorHeader() {
  const [tags, setTags] = useState([
    { label: "Research", value: "research", color: "#6366f1" },
    { label: "Todo", value: "todo", color: "#f59e42" },
    { label: "Idea", value: "idea", color: "#10b981" },
  ]);

  const handleRemoveTag = (value: string) =>
    setTags(tags.filter(tag => tag.value !== value));

  const handleTagClick = (value: string) => alert(`Tag clicked: ${value}`);

  return (
    <div className="flex flex-col gap-2 bg-background border-b p-4">
      <TagPills tags={tags} onRemove={handleRemoveTag} onClick={handleTagClick} />
    </div>
  );
}
