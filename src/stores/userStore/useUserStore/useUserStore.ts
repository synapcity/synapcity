import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { migrateUserStore } from "../migrate";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  username: string;
};

export type UserState = {
  user: User | null | undefined;
  isLoggedIn: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  hasHydrated: boolean;
};

export type UserActions = {
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateUser: (data: Partial<User>) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  loginDemo: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultUserStore: UserState = {
  user: null,
  isLoggedIn: false,
  token: null,
  loading: false,
  error: null,
  hasHydrated: false,
};

export const userJane: User = {
  id: "1",
  name: "Hanaa",
  email: "hanaa@mail.com",
  avatar: "https://avatars.githubusercontent.com/u/40529421?v=4",
  username: "hanaa",
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...defaultUserStore,
      login: (user: User) => {
        set({ user, isLoggedIn: true });
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
      setLoading: (loading: boolean) => {
        set({ loading });
      },
      setError: (error: string | null) => {
        set({ error });
      },
      updateUser: (data: Partial<User>) => {
        set((state) => ({
          user: { ...state.user, ...data } as User,
        }));
      },
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      loginDemo: () => {
        set({ user: { ...userJane }, isLoggedIn: true });
      },
    }),
    {
      name: "user-state",
      version: 2,
      migrate: migrateUserStore,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        loading: state.loading,
        error: state.error,
        hasHydrated: state.hasHydrated,
      }),
    } satisfies PersistOptions<UserStore, UserState>
  )
);
