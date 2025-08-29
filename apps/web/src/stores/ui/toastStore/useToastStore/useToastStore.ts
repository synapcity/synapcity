import { create } from "zustand";
import { nanoid } from "nanoid";

export type ToastType = "success" | "error" | "info";

export interface ToastMeta {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  entityId?: string;
  createdAt: number;
}

interface ToastState {
  toasts: ToastMeta[];
  showToast: (
    message: string,
    type: ToastType,
    opts?: Partial<Omit<ToastMeta, "id" | "message" | "type" | "createdAt">>
  ) => void;
  clearToast: (id: string) => void;
  clearAllToasts: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  showToast: (message, type, opts = {}) => {
    const toast: ToastMeta = {
      id: nanoid(),
      message,
      type,
      duration: opts.duration ?? 3000,
      entityId: opts.entityId,
      createdAt: Date.now(),
    };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));
  },

  clearToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  clearAllToasts: () => set({ toasts: [] }),
}));
