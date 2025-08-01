import type { UIState } from "../useUIStore";

const defaultUIState: UIState = {
	components: {},
};

export const migrateUIStore = (
	persistedState: unknown,
	version: number
): UIState => {
	const state = (persistedState as Partial<UIState>) ?? {};
	if (version < 1) {
		return defaultUIState;
	}
	return {
		...defaultUIState,
		...state,
	};
};
