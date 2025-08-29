import { useEffect } from "react";
import { useCommandMenuStore } from "@/stores/commandMenuStore";

export function useCommandMenu(shortcut = "k", withMeta = true) {
  const setOpen = useCommandMenuStore((s) => s.setOpen);

  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if (
        ((withMeta && (e.metaKey || e.ctrlKey)) || !withMeta) &&
        e.key.toLowerCase() === shortcut
      ) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [setOpen, shortcut, withMeta]);
}
