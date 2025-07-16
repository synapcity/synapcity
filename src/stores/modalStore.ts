import { create } from "zustand";

type ModalType = "weatherSettings" | "confirm" | "delete" | "search" | null;

interface ModalState {
	openModal: ModalType;
	open: (modal: ModalType) => void;
	close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
	openModal: null,
	open: (modal) => set({ openModal: modal }),
	close: () => set({ openModal: null }),
}));
