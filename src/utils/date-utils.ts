import { format } from "date-fns";

export const getTodaysDate = () => {
	return format(new Date(), "EEEE, MMMM do");
};

export const formatDate = (iso: string) => {
	try {
		const dt = new Date(iso);
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "2-digit",
		}).format(dt);
	} catch {
		return iso;
	}
};

export const formatRelative = (iso: string) => {
	const now = Date.now();
	const then = new Date(iso).getTime();
	const diff = now - then;

	if (isNaN(then)) return "";
	const seconds = Math.floor(diff / 1000);
	if (seconds < 60) return `${seconds}s ago`;
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	if (days < 7) return `${days}d ago`;
	const weeks = Math.floor(days / 7);
	if (weeks < 4) return `${weeks}w ago`;
	const months = Math.floor(days / 30);
	if (months < 12) return `${months}mo ago`;
	const years = Math.floor(days / 365);
	return `${years}y ago`;
};

export function getShortRelativeTime(date: Date) {
	const diffMs = Date.now() - date.getTime();
	const diffMinutes = Math.round(diffMs / 60000);
	if (diffMinutes < 1) return "just now";
	if (diffMinutes < 60) return `${diffMinutes}m ago`;
	const diffHours = Math.round(diffMinutes / 60);
	if (diffHours < 24) return `${diffHours}h ago`;
	const diffDays = Math.round(diffHours / 24);
	return `${diffDays}d ago`;
}
