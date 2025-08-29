"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SidebarModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  containerRef?: React.RefObject<HTMLElement>;
};

export function SidebarModal({
  open,
  onClose,
  children,
  className = "",
  containerRef,
}: SidebarModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        (!containerRef || containerRef.current?.contains(e.target as Node))
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, onClose, containerRef]);

  useEffect(() => {
    if (!open || !modalRef.current) return;
    const el = modalRef.current;
    el.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.16 }}
          tabIndex={-1}
          ref={modalRef}
          className={`fixed top-0 right-0 h-full max-w-xs w-full z-50 shadow-2xl border-l bg-background outline-none
            ${className}
            `}
          style={{}}
          role="dialog"
          aria-modal="true"
        >
          <div className="p-4 relative h-full flex flex-col">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 rounded text-muted-foreground hover:bg-muted focus:outline-none"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
