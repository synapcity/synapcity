import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
	id: string;
	name: string;
	email: string;
	avatar: string;
	username: string;
};

export type UserState = {
	user: User | null;
	isLoggedIn: boolean;
	token: string | null;
	loading: boolean;
	error: string | null;
};

export type UserActions = {
	login: (user: User) => void;
	logout: () => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	updateUser: (data: Partial<User>) => void;
};

export type UserStore = UserState & UserActions;

export const defaultUserStore: UserState = {
	user: null,
	isLoggedIn: false,
	token: null,
	loading: false,
	error: null,
};

export const userJane: User = {
	id: "1",
	name: "Hanaa",
	email: "hanaa@mail.com",
	avatar: "https://avatars.githubusercontent.com/u/40529421?v=4",
	username: "hanaa",
};

export const useUserStore = create(
	persist<UserStore>(
		(set) => ({
			...defaultUserStore,
			login: (user: User) => {
				set({ user: user ?? { ...userJane }, isLoggedIn: true });
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
		}),
		{
			name: "user-state",
		}
	)
);
