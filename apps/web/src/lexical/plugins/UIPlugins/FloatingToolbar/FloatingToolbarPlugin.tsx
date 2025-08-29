import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useRef } from "react";

export function FloatingToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = window.getSelection();
        const isCollapsed = selection?.isCollapsed;
        const hasText = selection?.toString().trim().length;
        if (ref.current && !isCollapsed && hasText) {
          const range = selection?.getRangeAt(0);
          const rect = range?.getBoundingClientRect();
          if (rect) {
            ref.current.style.display = "flex";
            ref.current.style.top = `${rect.top - 40 + window.scrollY}px`;
            ref.current.style.left = `${rect.left + rect.width / 2}px`;
          }
        } else {
          if (ref.current) ref.current.style.display = "none";
        }
      });
    });
    return () => unregister();
  }, [editor]);

  return (
    <div
      ref={ref}
      className="absolute z-50 hidden bg-popover border rounded shadow p-1 text-xs -translate-x-1/2"
    >
      <button className="hover:bg-muted px-2 py-1 rounded">Bold</button>
      <button className="hover:bg-muted px-2 py-1 rounded">Italic</button>
      <button className="hover:bg-muted px-2 py-1 rounded">Link</button>
    </div>
  );
}
