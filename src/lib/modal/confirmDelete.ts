// import { useModalStore } from "@/stores";
/**
 * Opens a confirm modal and resolves to true/false.
 */
export function confirmDelete({
	title = "Are you sure you'd like to delete?",
	description = "This action cannot be undone.",
	confirmText = "Delete",
	cancelText = "Cancel",
}: {
	title?: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
}): Promise<boolean> {
	return new Promise((resolve) => {
		// const openModal = useModalStore.getState().openModal;
		// 	openModal("confirm", {
		// 		id: "confirm-delete",
		// 		title,
		// 		description,
		// 		actions: [
		// 			{
		// 				label: cancelText,
		// 				variant: "ghost",
		// 				onClick: () => resolve(false),
		// 			},
		// 			{
		// 				label: confirmText,
		// 				variant: "primary",
		// 				onClick: () => resolve(true),
		// 			},
		// 		],
		// 		onCancel: () => resolve(false),
		// 		onConfirm: () => resolve(true),
		// 	});
		console.log(
			"resolve modal",
			resolve,
			"title",
			title,
			"desc",
			description,
			"confirmText",
			confirmText,
			"cancelext",
			cancelText
		);
	});
}

// // "use client";

// // import { useCallback } from "react";
// // import { useModalStore } from "@/stores/modalStore";
// // import { Dashboard } from "@/types/dashboard";
// // export function useSearchModal<T>(
// // 	items: T[],
// // 	keys: (keyof T)[] | { name: keyof T; weight?: number }[],
// // 	renderItem: (item: T) => React.ReactNode,
// // 	options?: {
// // 		title?: string;
// // 		description?: string;
// // 		placeholder?: string;
// // 		fuseOptions?: object;
// // 		debounce?: number;
// // 	}
// // ) {
// // 	const open = useModalStore((s) => s.openModal);
// // 	const close = useModalStore((s) => s.closeModal);

// // 	return useCallback(
// // 		(onConfirm?: (results: T[]) => void) => {
// // 			open("search", {
// // 				id: "search-single",
// // 				items,
// // 				keys,
// // 				renderItem,
// // 				title: options?.title,
// // 				description: options?.description,
// // 				placeholder: options?.placeholder,
// // 				onClose: close,
// // 				onConfirm: (results?: T[]) => {
// // 					onConfirm?.((results ?? []) as T[]);
// // 					close();
// // 				},
// // 			});
// // 		},
// // 		[open, close, items, keys, renderItem, options]
// // 	);
// // }

// // export function useSettingsModal() {
// // 	const openModal = useModalStore((s) => s.openModal);
// // 	const closeModal = useModalStore((s) => s.closeModal);
// // 	return useCallback(() => {
// // 		openModal("settings", {
// // 			id: "app-settings",
// // 			title: "App Settings",
// // 			description: "Customize your settings.",
// // 			actions: [
// // 				{ label: "Cancel", variant: "ghost", onClick: () => closeModal() },
// // 				{ label: "Save", variant: "primary", onClick: () => closeModal() },
// // 			],
// // 		});
// // 	}, [openModal, closeModal]);
// // }

// // export function useCreateDashboardModal(onSubmit?: (id: string) => void) {
// // 	const openModal = useModalStore((s) => s.openModal);
// // 	const closeModal = useModalStore((s) => s.closeModal);
// // 	return useCallback(() => {
// // 		openModal("form", {
// // 			id: "create-dashboard",
// // 			title: "New Dashboard",
// // 			description: "Enter a name for your new dashboard.",
// // 			actions: [
// // 				{ label: "Cancel", variant: "ghost", onClick: () => closeModal() },
// // 				{
// // 					label: "Create",
// // 					variant: "primary",
// // 					type: "submit",
// // 					onClick: () => closeModal(),
// // 					onSubmit: (data: Partial<Dashboard>) => onSubmit?.(data.id as string),
// // 				},
// // 			],
// // 		});
// // 	}, [openModal, closeModal, onSubmit]);
// // }

// "use client";

// import { useCallback } from "react";
// import { useModalStore } from "@/stores/modalStore";
// import { Dashboard } from "@/types/dashboard";
// import { useDashboardStore } from "@/stores";

// /**
//  * Opens a search modal with customizable rendering and filtering options.
//  */
// export function useSearchModal<T>(
// 	items: T[],
// 	keys: (keyof T)[] | { name: keyof T; weight?: number }[],
// 	renderItem: (item: T) => React.ReactNode,
// 	options?: {
// 		title?: string;
// 		description?: string;
// 		placeholder?: string;
// 		fuseOptions?: object;
// 		debounce?: number;
// 	}
// ) {
// 	const open = useModalStore((s) => s.openModal);
// 	const close = useModalStore((s) => s.closeModal);

// 	return useCallback(
// 		(onConfirm?: (results: T[]) => void) => {
// 			open("search", {
// 				id: "search-single",
// 				items,
// 				keys,
// 				renderItem,
// 				title: options?.title,
// 				description: options?.description,
// 				placeholder: options?.placeholder,
// 				onClose: close,
// 				onConfirm: (results?: T[]) => {
// 					onConfirm?.((results ?? []) as T[]);
// 					close();
// 				},
// 			});
// 		},
// 		[open, close, items, keys, renderItem, options]
// 	);
// }

// /**
//  * Opens a settings modal with cancel/save actions.
//  */
// export function useSettingsModal() {
// 	const openModal = useModalStore((s) => s.openModal);
// 	const closeModal = useModalStore((s) => s.closeModal);

// 	return useCallback(() => {
// 		openModal("settings", {
// 			id: "app-settings",
// 			title: "App Settings",
// 			description: "Customize your preferences.",
// 			actions: [
// 				{
// 					label: "Cancel",
// 					variant: "ghost",
// 					onClick: () => closeModal(),
// 				},
// 				{
// 					label: "Save",
// 					variant: "primary",
// 					onClick: () => closeModal(),
// 				},
// 			],
// 		});
// 	}, [openModal, closeModal]);
// }

// /**
//  * Opens a form modal to create a dashboard.
//  */
// export function useCreateDashboardModal(onSubmit?: (id: string) => void) {
// 	const openModal = useModalStore((s) => s.openModal);
// 	const closeModal = useModalStore((s) => s.closeModal);

// 	return useCallback(() => {
// 		openModal("form", {
// 			id: "create-dashboard",
// 			title: "New Dashboard",
// 			description: "Enter a name for your new dashboard.",
// 			actions: [
// 				{
// 					label: "Cancel",
// 					variant: "ghost",
// 					onClick: () => closeModal(),
// 				},
// 				{
// 					label: "Create",
// 					variant: "primary",
// 					type: "submit",
// 					onClick: () => closeModal(),
// 					onSubmit: (data: Partial<Dashboard>) => onSubmit?.(data.id as string),
// 				},
// 			],
// 		});
// 	}, [openModal, closeModal, onSubmit]);
// }

// export function openRenameModal(dash: Dashboard) {
// 	const openModal = useModalStore.getState().openModal;
// 	const close = useModalStore.getState().close;

// 	openModal("form", {
// 		id: `rename-dashboard-${dash.id}`,
// 		title: "Rename Dashboard",
// 		description: `Change the name of “${dash.name}”.`,
// 		actions: [
// 			{
// 				label: "Cancel",
// 				variant: "ghost",
// 				onClick: () => useModalStore.getState().closeModal(),
// 			},
// 			{
// 				label: "Rename",
// 				variant: "primary",
// 				type: "submit",
// 				onSubmit: (data: { name: string }) => {
// 					useDashboardStore
// 						.getState()
// 						.updateDashboard(dash.id, { name: data.name });
// 					console.log("Renamed to", data.name);
// 				},
// 				onClick: () => (data: { name: string }) => {
// 					useDashboardStore
// 						.getState()
// 						.updateDashboard(dash.id, { name: data.name });
// 					close();
// 				},
// 			},
// 		],
// 	});
// }

// export function openCloneModal(dash: Dashboard) {
// 	// duplicate dashboard in your store
// 	console.log("Open clone modal for dashboard:", dash);
// }
// export function openDashboardSettings(dash: Dashboard) {
// 	console.log("Open settings modal for dashboard:", dash);
// 	/*…*/
// }
// export function openWidgetPicker(dash: Dashboard) {
// 	console.log("Open widget picker for dashboard:", dash);
// 	/*…*/
// }
// export function exportLayout(dash: Dashboard) {
// 	console.log("Exporting layout for dashboard:", dash);
// 	// const json = JSON.stringify(dash.layout);
// 	// downloadFile(`${dash.name}_layout.json`, json);
// }
// export function confirmArchive(dash: Dashboard) {
// 	console.log("Confirm archive for dashboard:", dash);
// 	/*…*/
// }
// // src/utils/confirmDelete.ts (or in utils/index.ts and re-exported)

// // export function confirmDelete({
// // 	title = "Are you sure you'd like to delete?",
// // 	description = "This action cannot be undone.",
// // }: {
// // 	title?: string;
// // 	description?: string;
// // 	confirmText?: string;
// // 	cancelText?: string;
// // }): Promise<boolean> {
// // 	return new Promise((resolve) => {
// // 		open("confirm", {
// // 			id: "confirm-delete",
// // 			title,
// // 			description,
// // 			onConfirm: () => resolve(true),
// // 			onCancel: () => resolve(false),
// // 		});
// // 	});
// // }
