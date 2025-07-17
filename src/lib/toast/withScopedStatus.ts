import { useUIStore } from "@/stores";
import { showToast } from "./showToast";
import type { UIStatusField } from "@/types/ui";

type Messages = {
	loading?: string;
	success: string | ((i: number) => string);
	error: string | ((i: number) => string);
	entityId?: string;
	duration?: number;
};

export async function withToast<T>(
	action: () => Promise<T>,
	messages: Messages
): Promise<T | undefined> {
	try {
		if (messages.loading)
			showToast.info(messages.loading, { entityId: messages.entityId });
		const result = await action();
		showToast.success(
			typeof messages.success === "function"
				? messages.success(0)
				: messages.success,
			{
				entityId: messages.entityId,
				duration: messages.duration || 3000,
			}
		);
		return result;
	} catch (error) {
		const fallback = error instanceof Error ? error.message : String(error);
		showToast.error(
			typeof messages.error === "function"
				? messages.error(0)
				: messages.error || fallback,
			{ entityId: messages.entityId, duration: messages.duration || 4000 }
		);
		return undefined;
	}
}

export async function withStatusAndToast<T>(
	type: UIStatusField,
	action: () => Promise<T>,
	messages: Messages
): Promise<T | undefined> {
	const startStatus = useUIStore.getState().startStatus;
	const finishStatus = useUIStore.getState().finishStatus;
	const failStatus = useUIStore.getState().failStatus;
	startStatus(type);
	try {
		const result = await withToast(action, messages);
		finishStatus(type);
		return result;
	} catch (err) {
		failStatus(type, err as Error);
		return undefined;
	}
}

export async function withScopedStatusToast<T>(
	field: UIStatusField,
	type: string,
	id: string,
	action: () => Promise<T>,
	messages: Messages
): Promise<T | undefined> {
	const { startStatus, finishStatus, failStatus } = useUIStore.getState();
	try {
		startStatus(field, type, id);
		if (messages.loading) showToast.info(messages.loading, { entityId: id });
		const result = await action();
		finishStatus(field, type, id);
		if (messages.success)
			showToast.success(
				typeof messages.success === "function"
					? messages.success(0)
					: messages.success,
				{ entityId: id }
			);
		return result;
	} catch (err) {
		failStatus(field, err as Error, type, id);
		if (messages.error)
			showToast.error(
				typeof messages.error === "function"
					? messages.error(0)
					: messages.error,
				{ entityId: id }
			);
		return undefined;
	}
}

export async function withToastQueue<T>(
	actions: (() => Promise<T>)[],
	messages: Messages
): Promise<(T | undefined)[]> {
	const results: (T | undefined)[] = [];
	for (let i = 0; i < actions.length; i++) {
		const result = await withToast(actions[i], {
			...messages,
			success:
				typeof messages.success === "function"
					? messages.success(i)
					: messages.success,
			error:
				typeof messages.error === "function"
					? messages.error(i)
					: messages.error,
		});
		results.push(result);
	}
	return results;
}

export async function withToastAll<T>(
	actions: (() => Promise<T>)[],
	messages: Messages
): Promise<(T | undefined)[]> {
	if (messages.loading) {
		showToast.info(messages.loading, { entityId: messages.entityId });
	}

	return Promise.all(
		actions.map(async (action, i) => {
			try {
				const result = await action();
				showToast.success(
					typeof messages.success === "function"
						? messages.success(i)
						: messages.success,
					{ entityId: messages.entityId, duration: messages.duration }
				);
				return result;
			} catch (error) {
				const fallback = error instanceof Error ? error.message : String(error);
				showToast.error(
					typeof messages.error === "function"
						? messages.error(i)
						: messages.error || fallback,
					{ entityId: messages.entityId, duration: messages.duration }
				);
				return undefined;
			}
		})
	);
}
