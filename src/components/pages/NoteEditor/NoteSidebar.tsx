'use client';

import { useState } from 'react';
import { Button } from '@/components';
import { useNotesStore } from '@/stores/refactor/notesStore';

export function NoteSidebar() {
  const { items, addItem } = useNotesStore();
  const [draft, setDraft] = useState('');

  const handleAdd = () => {
    if (draft.trim()) {
      setDraft('');
    }
  };

  return (
    <div className="w-80 border-l bg-white dark:bg-gray-800 p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Context</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add context…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="flex-1 rounded border px-3 py-2 focus:ring focus:ring-indigo-200"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <ul className="flex-1 overflow-auto space-y-2">
        {Object.values(items).map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded bg-gray-50 dark:bg-gray-700 px-3 py-2"
          >
            <span className="break-words flex-1">{item.preview}</span>
            <Button variant="ghost" size="sm" onClick={() => console.log("removing")}>
              ✕
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}