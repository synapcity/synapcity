import { create } from "zustand";
import { ConfirmModalProps } from "@/components/modals/ConfirmModal/ConfirmModal";
import { ScheduleEvent } from "../scheduleStore";

export type ModalScope = "global" | "userPanelMain" | "userPanelSidebar";
export type ModalType = "confirm" | "weatherSettings" | "scheduleForm";

interface WeatherSettingsModalProps {
	initialUnit: "F" | "C";
	onSave(unit: "F" | "C"): void;
}

interface ScheduleFormModalProps {
	initialData?: ScheduleEvent;
	onSave(data: ScheduleEvent): void;
	onCancel(): void;
}

type ModalPropsMap = {
	confirm: ConfirmModalProps;
	weatherSettings: WeatherSettingsModalProps;
	scheduleForm: ScheduleFormModalProps;
};

export interface BaseModalProps {
	open: boolean;
	onOpenChange(open: boolean): void;
	title?: string;
	description?: string;
	trigger?: React.ReactNode;
	triggerAsChild?: boolean;
}

export type CombinedModalProps = Partial<
	BaseModalProps & ModalPropsMap[ModalType]
> | null;

interface ModalState {
	scope: ModalScope;
	instanceId?: string;
	modalType: ModalType | null;
	modalProps: CombinedModalProps;

	openModal(
		type: ModalType,
		scope?: ModalScope,
		instanceId?: string,
		props?: CombinedModalProps
	): void;

	closeModal(): void;
}

export const useModalStore = create<ModalState>((set) => ({
	scope: "global",
	instanceId: undefined,
	modalType: null,
	modalProps: null,

	openModal: (type, scope = "global", instanceId, props = null) =>
		set({ modalType: type, modalProps: props, scope, instanceId }),

	closeModal: () => {
		set({ modalType: null, modalProps: null, instanceId: undefined });
	},
}));

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { create } from "zustand";
// import { ScheduleEvent } from "../scheduleStore";
// import { ConfirmModalProps } from "@/components/modals/ConfirmModal/ConfirmModal";
// import { RefObject } from "react";
// // 1) Define your scopes and modal “kinds”
// export type ModalScope = "global" | "userPanelMain" | "userPanelSidebar";
// export type ModalType = "confirm" | "weatherSettings" | "scheduleForm";

// interface WeatherSettingsModalProps {
// 	initialUnit: "F" | "C";
// 	onSave(unit: "F" | "C"): void;
// }

// interface ScheduleFormModalProps {
// 	initialData?: ScheduleEvent;
// 	onSave(data: ScheduleEvent): void;
// 	onCancel(): void;
// }

// // 3) Map types → their props
// type ModalPropsMap = {
// 	confirm: ConfirmModalProps;
// 	weatherSettings: WeatherSettingsModalProps;
// 	scheduleForm: ScheduleFormModalProps;
// };

// // 4) The shape of the props passed to your React component
// export type ModalComponentProps<T extends ModalType> = {
// 	open: boolean;
// 	onOpenChange(open: boolean): void;
// 	trigger?: RefObject<any>;
// } & ModalPropsMap[T];

// // 5) Your store state—non‑generic—with a generic openModal method
// interface ModalState {
// 	scope: ModalScope;
// 	modalType: ModalType | null;
// 	modalProps: Partial<ModalComponentProps<ModalType> | null> | null;

// 	openModal<T extends ModalType>(
// 		type: T,
// 		props?: Partial<ModalComponentProps<T> | null> | null,
// 		scope?: ModalScope
// 	): void;

// 	closeModal(): void;
// }

// export const useModalStore = create<ModalState>((set) => ({
// 	scope: "global",
// 	modalType: null,
// 	modalProps: null,

// 	openModal: (type, props = null, scope = "global") => {
// 		console.log("im here :/", type, props, scope);
// 		set({ modalType: type, modalProps: props, scope });
// 	},
// 	closeModal: () => set({ modalType: null, modalProps: null }),
// }));
// import { RefObject } from "react";
// import { FieldDefinitionMap } from "@/types/form";
