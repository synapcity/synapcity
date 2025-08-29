import { defaultUserStore, UserState, UserStore } from "../useUserStore";

const defaultUserActions = {
  login: () => {},
  logout: () => {},
  setLoading: () => {},
  setError: () => {},
  updateUser: () => {},
  setHasHydrated: () => {},
  loginDemo: () => {},
};
export const migrateUserStore = (persistedState: unknown, version: number): UserStore => {
  const state = (persistedState as Partial<UserState>) ?? {};

  if (version < 1) {
    return {
      ...defaultUserStore,
      ...defaultUserActions,
    };
  }

  return {
    user: state.user ?? defaultUserStore.user,
    isLoggedIn: state.isLoggedIn ?? defaultUserStore.isLoggedIn,
    token: state.token ?? defaultUserStore.token,
    loading: state.loading ?? defaultUserStore.loading,
    error: state.error ?? defaultUserStore.error,
    hasHydrated: state.hasHydrated ?? defaultUserStore.hasHydrated,
    ...defaultUserActions,
  };
};
