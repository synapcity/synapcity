import { useToastStore } from "@/stores/toastStore";

const lastShown: Record<string, number> = {};
const DEDUPE_TIMEOUT = 1000;

function shouldShowToast(key: string): boolean {
	const now = Date.now();
	const last = lastShown[key] || 0;
	if (now - last < DEDUPE_TIMEOUT) return false;
	lastShown[key] = now;
	return true;
}

export const showToast = {
	success: (msg: string, opts?: { entityId?: string; duration?: number }) => {
		const key = `success-${opts?.entityId ?? msg}`;
		if (shouldShowToast(key)) {
			useToastStore.getState().showToast(msg, "success", opts);
		}
	},
	error: (msg: string, opts?: { entityId?: string; duration?: number }) => {
		const key = `error-${opts?.entityId ?? msg}`;
		if (shouldShowToast(key)) {
			useToastStore.getState().showToast(msg, "error", opts);
		}
	},
	info: (msg: string, opts?: { entityId?: string; duration?: number }) => {
		const key = `info-${opts?.entityId ?? msg}`;
		if (shouldShowToast(key)) {
			useToastStore.getState().showToast(msg, "info", opts);
		}
	},
};
