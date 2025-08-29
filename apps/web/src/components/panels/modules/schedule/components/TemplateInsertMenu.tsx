"use client";
import { useTemplateStore } from "@/stores/templateStore";

export function TemplateInsertMenu({ onInsert }: { onInsert: (content: string) => void }) {
  const templates = useTemplateStore((s) => s.templates);

  return (
    <div className="flex gap-2 mt-1">
      <span className="text-xs">Use Template:</span>
      {templates.map((tpl) => (
        <button
          key={tpl.id}
          className="px-2 py-0.5 rounded bg-muted text-xs"
          onClick={() => onInsert(tpl.content)}
          title={tpl.name}
        >
          {tpl.icon ? <span className="mr-1">{tpl.icon}</span> : null}
          {tpl.name}
        </button>
      ))}
    </div>
  );
}
