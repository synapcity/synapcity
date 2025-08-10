import type { ComponentType } from "react";

export type OpenModalFn = {
        <T extends ModalType>(
                type: T,
                props?: ModalComponentProps<Record<string, unknown>> | null,
                scope?: ModalScope
        ): void;
};

export type ModalScope = "global" | "userPanelMain" | "userPanelSidebar";
export type ModalType = "confirm" | "weatherSettings" | "scheduleForm";

export type ModalComponentProps<T> = T & {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export type ModalDefinition<T> = {
	component: ComponentType<ModalComponentProps<T>>;
	scope: ModalScope;
};
