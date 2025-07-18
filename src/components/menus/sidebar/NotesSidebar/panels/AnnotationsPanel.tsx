"use client";

import React from "react";
import { useNodeStore } from "@/stores/nodeStore";
import { useAnnotationStore } from "@/stores/annotationStore";

export default function AnnotationsSidebar() {
  const activeKey = useNodeStore((s) => s.activeNodeKey);
  const annotationsByKey = useAnnotationStore((s) => s.getAnnotations)(activeKey ?? "");

  if (!activeKey) {
    return <div className="p-4 text-sm text-gray-500">Select a paragraph to view annotations.</div>;
  }

  const annotations = annotationsByKey || [];
  return (
    <div className="p-4">
      <h3 className="mb-2 font-semibold">annotations for block {activeKey}</h3>
      {annotations.length === 0 ? (
        <p className="text-gray-600">No annotations yet.</p>
      ) : (
        <ul className="space-y-1">
          {annotations.map((note) => (
            <li key={note.id} className="border-b pb-1">
              {note.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
