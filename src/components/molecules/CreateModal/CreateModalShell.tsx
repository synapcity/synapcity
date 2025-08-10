"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/atoms/ui/dialog";
import { Button } from "@/components";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CreateModalShellProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: ReactNode; // Button, Icon, etc.
  title: string;
  description?: string;
  children: ReactNode; // Input fields/form
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  canSubmit?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}

export function CreateModalShell({
  open,
  setOpen,
  trigger,
  title,
  description,
  children,
  onSubmit,
  canSubmit = true,
  submitLabel = "Create",
  cancelLabel = "Cancel",
}: CreateModalShellProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription className="mb-4">{description}</DialogDescription>}
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {children}
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="ghost" type="button">
                  {cancelLabel}
                </Button>
              </DialogClose>
              <Button type="submit" disabled={!canSubmit}>
                {submitLabel}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
