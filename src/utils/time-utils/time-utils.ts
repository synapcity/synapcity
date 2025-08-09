export function fmtTime(iso: string | undefined) {
  if (!iso) return "";
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isTimeOrderValid(
        events: { start: string; end?: string }[]
): boolean {
        const normalized = events
                .map((e) => ({
                        start: new Date(e.start).getTime(),
                        end: new Date(e.end ?? e.start).getTime(),
                }))
                .sort((a, b) => a.start - b.start);

        for (let i = 0; i < normalized.length; ++i) {
                const { start, end } = normalized[i];
                if (isNaN(start) || isNaN(end)) return false;
                const next = normalized[i + 1];
                if (next && end > next.start) return false;
        }
        return true;
}