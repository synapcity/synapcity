'use client';

import { useEffect, useRef } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave?: (editorJSON: any) => void;
}

export default function TabAutosavePlugin({ onSave }: Props) {
  const [editor] = useLexicalComposerContext();
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const save = async () => {
      try {
        const editorState = editor.getEditorState();
        const json = editorState.toJSON();
        onSave?.(json);
      } catch (err) {
        console.error('Tab autosave failed', err);
      }
    };

    const unregister = editor.registerUpdateListener(() => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(save, 1250);
    });

    return () => unregister();
  }, [editor, onSave]);

  return null;
}

