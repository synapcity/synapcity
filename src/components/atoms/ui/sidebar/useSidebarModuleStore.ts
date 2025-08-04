import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export const SIDEBAR_DIMENSIONS = {
	MOBILE: 320,
	DEFAULT: 320,
	MIN: 64,
	MAX: 360,
	ICON: 0,
};

export const SIDEBAR_STATES = {
	EXPANDED: "expanded",
	ICON: "icon",
	OFFCANVAS: "offcanvas",
} as const;

export type SidebarState = (typeof SIDEBAR_STATES)[keyof typeof SIDEBAR_STATES];
export type SidebarSettings = {
	width?: number;
	collapsible: "none" | "icon" | "offcanvas"
	collapsedState?: SidebarState;
	isPinned?: boolean;
	isHidden?: boolean;
	isResizing?: boolean;
	lastActiveAt?: number;
	dimensions?: {
		width: number;
	}
};

export type SidebarModule = {
	id: string;
	label: string;
	icon: LucideIcon | string;
	component: ReactNode;
	pinned?: boolean;
	hidden?: boolean;
};

const defaultModule: SidebarModule = {
	id: "default",
	label: "Untitled",
	icon: "panel",
	component: null,
	pinned: false,
	hidden: false,
};

type SidebarModuleStore = {
	settingsById: Record<string, SidebarSettings>;
	sidebarModulesById: Record<string, SidebarModule>;

	updateSettings: (id: string, updates: Partial<SidebarSettings>) => void;
	getSettings: (id: string) => SidebarSettings;
	resetSettings: (id: string) => void;

	getModuleById: (id: string) => SidebarModule;
	setModuleById: (id: string, module: SidebarModule) => SidebarModule;
	updateModule: (id: string, updates: Partial<SidebarModule>) => SidebarModule;
};

export const useSidebarModuleStore = create<SidebarModuleStore>()(
	persist(
		(set, get) => ({
			settingsById: {},
			sidebarModulesById: {},

			updateSettings: (id, updates) => {
				const current = get().settingsById[id] ?? {};
				const updated = { ...current, ...updates };
				set((state) => ({
					settingsById: {
						...state.settingsById,
						[id]: updated,
					},
				}));
			},

			getSettings: (id) => get().settingsById[id] ?? {},

			resetSettings: (id) =>
				set((state) => {
					const next = { ...state.settingsById };
					delete next[id];
					return { settingsById: next };
				}),

			getModuleById: (id) => get().sidebarModulesById[id] ?? defaultModule,

			setModuleById: (id, module) => {
				const merged = { ...defaultModule, ...module, id };
				set((state) => ({
					sidebarModulesById: {
						...state.sidebarModulesById,
						[id]: merged,
					},
				}));
				return merged;
			},

			updateModule: (id, updates) => {
				const current = get().sidebarModulesById[id] ?? defaultModule;
				const updated = { ...current, ...updates };
				set((state) => ({
					sidebarModulesById: {
						...state.sidebarModulesById,
						[id]: updated,
					},
				}));
				return updated;
			},
		}),
		{ name: "sidebar-store", 
			migrate: (persisted, version) => {
			const state = persisted as SidebarModuleStore
			if(version < 1){
				return {
					...state,
					settingsById: {},
					modulesById: {},
				}
			}
			return {
				...state
			}
		} }
	)
);
