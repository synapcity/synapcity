export const updateNoteTabUrl = (noteId: string, tabId: string) => {
	const params = new URLSearchParams(window.location.search);
	params.set("noteId", noteId);
	params.set("tabId", tabId);
	const newUrl = `${window.location.pathname}?${params.toString()}`;
	window.history.replaceState(null, "", newUrl);
};
