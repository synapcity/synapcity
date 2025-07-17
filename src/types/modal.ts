import type { ButtonVariant } from "@/components/atoms/buttons/variants";
import { UIDialogContent } from "@/components";

export type ModalComponentProps = { close: () => void };

export type ModalType =
	| "form"
	| "confirm"
	| "delete"
	| "settings"
	| "default"
	| "search"
	| "create-note"
	| "invite"
	| "weatherSettings";

export type ModalAction = {
	label: string;
	type?: "submit" | "button";
	variant?: ButtonVariant;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	className?: string;
	icon?: string;
	iconPosition?: "left" | "right";
	loading?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit?: (data?: any) => void;
};

export interface ModalProps<T> {
	id?: string;
	title?: string;
	component?: React.ComponentType<unknown>;
	description?: string;
	onSubmit?: () => void;
	onConfirm?: (selectedItems?: T[]) => void;
	onCancel?: () => void;
	onDelete?: () => void;
	onClose?: () => void;
	placeholder?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	items?: any[];
	keys?: (keyof T)[] | { name: keyof T; weight?: number | undefined }[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	renderItem?: (item: any) => React.ReactNode;
	children?: React.ReactNode;
	actions?: ModalAction[];
	widgetId?: string;
}

export interface ModalContentProps
	extends Omit<React.ComponentProps<typeof UIDialogContent>, "actions"> {
	type?: ModalType;
	title?: string;
	showTitle?: boolean;
	titleClassName?: string;
	description?: string;
	showDescription?: boolean;
	descriptionClassName?: string;
	actions?: ModalAction[];
	containerRef?: React.RefObject<HTMLDivElement | null>;
}
