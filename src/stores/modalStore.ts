// import { create } from "zustand";

// type ModalType = "weatherSettings" | "confirm" | "delete" | "search" | null;

// interface ModalState {
// 	openModal: ModalType;
// 	open: (modal: ModalType) => void;
// 	close: () => void;
// }

// export const useModalStore = create<ModalState>((set) => ({
// 	openModal: null,
// 	open: (modal) => set({ openModal: modal }),
// 	close: () => set({ openModal: null }),
// }));
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import type { ModalType, ModalProps } from "@/types/modal";

interface ModalState {
	modalType: ModalType | null;
	setModalType: (modalType: ModalType | null) => void;
	modalProps: ModalProps<any> | null;
	setModalProps: (modalProps: ModalProps<any> | null) => void;
	openModal: (type: ModalType, props?: ModalProps<any> | null) => void;
	closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
	modalType: null,
	setModalType: (modalType) => set({ modalType }),
	modalProps: null,
	setModalProps: (modalProps) => set({ modalProps }),
	openModal: (modalType, modalProps = null) => set({ modalType, modalProps }),
	closeModal: () => set({ modalType: null, modalProps: null }),
}));
