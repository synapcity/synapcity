"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { InboxItem } from "./CaptureInboxItem";

interface CaptureInboxInputProps {
  addItem: (item: InboxItem) => void;
}

const PlusIcon = dynamic(() => import("lucide-react").then((mod) => mod.PlusIcon), { ssr: false });

export const CaptureInboxInput = ({ addItem }: CaptureInboxInputProps) => {
  const [input, setInput] = useState("");

  const handleAdd = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newItem: InboxItem = {
      id: crypto.randomUUID(),
      content: input.trim(),
      createdAt: new Date().toLocaleString(),
    };
    addItem(newItem);
    setInput("");
  };

  return (
    <div className="w-full flex items-center gap-2 mb-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Quick capture..."
        onKeyDown={(e) => e.key === "Enter" && handleAdd(e)}
        className="flex-1 bg-neutral-900 rounded px-3 py-1 text-sm text-neutral-100 outline-none"
      />
      <button
        onClick={handleAdd}
        className="bg-accent-500 hover:bg-accent-600 text-white p-1.5 rounded transition"
      >
        <PlusIcon size={16} />
      </button>
    </div>
  );
};
