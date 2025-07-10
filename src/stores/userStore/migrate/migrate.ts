import { defaultUserStore, UserState } from "../useUserStore";

export const migrateUserStore = (
	persistedState: unknown,
	version: number
): UserState => {
	const state = (persistedState as Partial<UserState>) ?? {};

	if (version < 1) {
		return defaultUserStore;
	}
	return {
		user: state.user ?? defaultUserStore.user,
		isLoggedIn: state.isLoggedIn ?? defaultUserStore.isLoggedIn,
		token: state.token ?? defaultUserStore.token,
		loading: state.loading ?? defaultUserStore.loading,
		error: state.error ?? defaultUserStore.error,
	};
};
