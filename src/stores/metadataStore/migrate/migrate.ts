/* eslint-disable @typescript-eslint/no-explicit-any */
export function migrateMetadataStore(
	persistedState: any,
	version: number
): any {
	if (version === 0) {
		return {
			...persistedState,
			language: persistedState.language ?? "en",
			themeMode: persistedState.themeMode ?? "light",
		};
	}
	return persistedState;
}
