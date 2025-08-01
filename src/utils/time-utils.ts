export function fmtTime(iso: string | undefined) {
	return iso
		? new Date(iso).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
		  })
		: "";
}

export function isTimeOrderValid(
	events: { start: string; end?: string }[]
): boolean {
	for (let i = 0; i < events.length - 1; ++i) {
		const thisEnd = new Date(events[i].end ?? events[i].start).getTime();
		const nextStart = new Date(events[i + 1].start).getTime();
		if (thisEnd > nextStart) return false;
	}
	return true;
}
