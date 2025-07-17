// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { nanoid } from "nanoid";
// import type { NoteTab } from "@/types/note";
// // import { TabbedEditor } from "@/lexicalEditor/ui";
// // // import { useSearchIndexStore } from "@/stores/searchIndexStore";
// // // import { SearchableScope } from "@/types/search";

// interface TabState {
// 	hasHydrated: boolean;
// 	tabs: Record<string, Record<string, NoteTab>>;
// 	defaultTabIdByNote: Record<string, string>;
// 	activeTabIdByNote: Record<string, string>;
// 	dirtyTabIds: string[];

// 	setHasHydrated: (v: boolean) => void;

// 	createTab: (noteId: string, data?: Partial<NoteTab>) => NoteTab;
// 	deleteTab: (noteId: string, tabId: string) => void;
// 	updateTab: (noteId: string, tabId: string, data: Partial<NoteTab>) => void;
// 	updateTabSettings: (
// 		noteId: string,
// 		tabId: string,
// 		s: { icon?: string; color?: string }
// 	) => void;
// 	restoreTab: (noteId?: string, tabId?: string) => void;
// 	purgeTab: (noteId?: string, tabId?: string) => void;
// 	softDeleteTab: (noteId: string, tabId: string) => void;

// 	getTabsForNote: (noteId: string) => NoteTab[];
// 	setTabsForNote: (noteId: string, tabs: NoteTab[]) => void;
// 	getDefaultTab: (noteId: string) => NoteTab | null;

// 	setActiveTab: (noteId?: string, tabId?: string | null) => void;
// 	getActiveTab: (noteId?: string) => NoteTab | null;

// 	markTabDirty: (id: string) => void;
// 	clearTabDirty: (id: string) => void;
// 	isTabDirty: (id: string) => boolean;
// }

// export const useTabStore = create<TabState>()(
// 	persist(
// 		(set, get) => ({
// 			hasHydrated: false,
// 			tabs: {},
// 			defaultTabIdByNote: {},
// 			activeTabIdByNote: {},
// 			dirtyTabIds: [],

// 			setHasHydrated: (v) => set({ hasHydrated: v }),

// 			createTab: (noteId, data = {}) => {
// 				const now = new Date().toISOString();
// 				const id = nanoid();
// 				const tabsForNote = get().tabs[noteId] ?? {};
// 				const isFirst = Object.keys(tabsForNote).length === 0;
// 				const isDefault = data.isDefault ?? isFirst;

// 				const newTab: NoteTab = {
// 					id,
// 					noteId,
// 					label: data.label ?? "New Tab",
// 					type: data.type ?? "editor",
// 					content: data.content ?? "",
// 					icon: data.icon,
// 					color: data.color,
// 					component: data.component,
// 					createdAt: now,
// 					updatedAt: now,
// 					isDefault,
// 				};

// 				set((state) => {
// 					const existing = state.tabs[noteId] ?? {};
// 					const newTabs = {
// 						...state.tabs,
// 						[noteId]: {
// 							...existing,
// 							[id]: newTab,
// 						},
// 					};
// 					const newActive = {
// 						...state.activeTabIdByNote,
// 						[noteId]: id,
// 					};
// 					const update: Partial<TabState> = {
// 						tabs: newTabs,
// 						activeTabIdByNote: newActive,
// 					};
// 					if (isDefault) {
// 						update.defaultTabIdByNote = {
// 							...state.defaultTabIdByNote,
// 							[noteId]: id,
// 						};
// 					}
// 					return update;
// 				});
// 				return newTab;
// 			},

// 			deleteTab: (noteId, tabId) => {
// 				set((state) => {
// 					// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 					const { [tabId]: _, ...rest } = state.tabs[noteId] ?? {};
// 					const next: Partial<TabState> = {
// 						tabs: {
// 							...state.tabs,
// 							[noteId]: rest,
// 						},
// 						dirtyTabIds: state.dirtyTabIds.filter((d) => d !== tabId),
// 					};
// 					if (state.activeTabIdByNote[noteId] === tabId) {
// 						next.activeTabIdByNote = { ...state.activeTabIdByNote };
// 						delete next.activeTabIdByNote[noteId];
// 					}
// 					if (state.defaultTabIdByNote[noteId] === tabId) {
// 						const remaining = Object.values(rest);
// 						if (remaining.length) {
// 							next.defaultTabIdByNote = {
// 								...state.defaultTabIdByNote,
// 								[noteId]: remaining[0].id,
// 							};
// 						} else {
// 							const copy = { ...state.defaultTabIdByNote };
// 							delete copy[noteId];
// 							next.defaultTabIdByNote = copy;
// 						}
// 					}
// 					return next;
// 				});
// 			},

// 			updateTab: (noteId, tabId, data) => {
// 				if (!tabId || !noteId) return;
// 				const tab = get().tabs[noteId]?.[tabId];
// 				if (!tab) return;
// 				const updated = {
// 					...tab,
// 					...data,
// 					updatedAt: new Date().toISOString(),
// 				};
// 				// useSearchIndexStore.getState().addOrUpdateEntry("tab", {
// 				// 	id: tab.id,
// 				// 	type: "tab" as SearchableScope,
// 				// 	title: data.label ?? tab.label,
// 				// 	content: data.content ?? tab.content,
// 				// 	noteId,
// 				// 	tabType: data.type ?? tab.type,
// 				// 	...data,
// 				// });
// 				set((state) => {
// 					const tabs = {
// 						...state.tabs,
// 						[noteId]: {
// 							...state.tabs[noteId],
// 							[tabId]: updated,
// 						},
// 					};
// 					const next: Partial<TabState> = { tabs };
// 					if (updated.isDefault) {
// 						next.defaultTabIdByNote = {
// 							...state.defaultTabIdByNote,
// 							[noteId]: tabId,
// 						};
// 					} else if (state.defaultTabIdByNote[noteId] === tabId) {
// 						const copy = { ...state.defaultTabIdByNote };
// 						delete copy[noteId];
// 						next.defaultTabIdByNote = copy;
// 					}
// 					return next;
// 				});
// 				get().markTabDirty(tabId);
// 			},

// 			updateTabSettings: (noteId, tabId, settings) => {
// 				get().updateTab(noteId, tabId, settings);
// 			},

// 			getTabsForNote: (noteId) => Object.values(get().tabs[noteId] || {}),

// 			setTabsForNote: (noteId, tabs) => {
// 				const map = Object.fromEntries(
// 					tabs.map((t) => [t.id, { ...t, noteId }])
// 				);
// 				const defaultTab = tabs.find((t) => t.isDefault);
// 				set((state) => ({
// 					tabs: { ...state.tabs, [noteId]: map },
// 					defaultTabIdByNote: {
// 						...state.defaultTabIdByNote,
// 						...(defaultTab ? { [noteId]: defaultTab.id } : {}),
// 					},
// 				}));
// 			},

// 			markTabDirty: (id) => {
// 				set((state) => ({
// 					dirtyTabIds: Array.from(new Set([...state.dirtyTabIds, id])),
// 				}));
// 			},

// 			clearTabDirty: (id) => {
// 				set((state) => ({
// 					dirtyTabIds: state.dirtyTabIds.filter((d) => d !== id),
// 				}));
// 			},

// 			getDefaultTab: (noteId) => {
// 				const id = get().defaultTabIdByNote[noteId];
// 				return id ? get().tabs[noteId]?.[id] ?? null : null;
// 			},

// 			setActiveTab: (noteId, tabId) => {
// 				if (!noteId || !tabId) return;
// 				set((state) => ({
// 					activeTabIdByNote: {
// 						...state.activeTabIdByNote,
// 						[noteId]: tabId,
// 					},
// 				}));
// 			},

// 			getActiveTab: (noteId) => {
// 				if (!noteId) return null;
// 				const id = get().activeTabIdByNote[noteId];
// 				return id ? get().tabs[noteId]?.[id] ?? null : null;
// 			},

// 			restoreTab: (noteId, tabId) => {
// 				if (!noteId || !tabId) return;
// 				const tab = get().tabs[noteId]?.[tabId];
// 				if (!tab) return;
// 				set((s) => ({
// 					tabs: {
// 						...s.tabs,
// 						[noteId]: {
// 							...s.tabs[noteId],
// 							[tabId]: {
// 								...tab,
// 								deletedAt: null,
// 							},
// 						},
// 					},
// 				}));
// 			},

// 			purgeTab: (noteId, tabId) => {
// 				if (!noteId || !tabId) return;
// 				set((s) => {
// 					const updated = { ...s.tabs[noteId] };
// 					delete updated[tabId];
// 					return {
// 						tabs: {
// 							...s.tabs,
// 							[noteId]: updated,
// 						},
// 					};
// 				});
// 			},

// 			softDeleteTab: (noteId, tabId) => {
// 				if (!noteId || !tabId) return;
// 				const tab = get().tabs[noteId]?.[tabId];
// 				if (!tab) return;
// 				set((s) => ({
// 					tabs: {
// 						...s.tabs,
// 						[noteId]: {
// 							...s.tabs[noteId],
// 							[tabId]: {
// 								...tab,
// 								deletedAt: new Date().toISOString(),
// 							},
// 						},
// 					},
// 				}));
// 			},

// 			isTabDirty: (id) => get().dirtyTabIds.includes(id),
// 		}),
// 		{
// 			name: "tab-store",
// 			version: 1,
// 			onRehydrateStorage: () => (state) => {
// 				state?.setHasHydrated(true);
// 			},
// 			partialize: (state) => ({
// 				tabs: state.tabs,
// 				defaultTabIdByNote: state.defaultTabIdByNote,
// 				activeTabIdByNote: state.activeTabIdByNote,
// 				dirtyTabIds: state.dirtyTabIds,
// 			}),
// 		}
// 	)
// );
// export const useTabSettings = (noteId: string, tabId: string) => {
// 	const tab = useTabStore((s) => s.tabs[noteId]?.[tabId]);
// 	const updateSettings = useTabStore((s) => s.updateTabSettings);

// 	return {
// 		icon: tab?.icon ?? null,
// 		color: tab?.color ?? null,
// 		setIcon: (icon: string) => updateSettings(noteId, tabId, { icon }),
// 		setColor: (color: string) => updateSettings(noteId, tabId, { color }),
// 	};
// };

// export const useTabSelection = (noteId: string) => {
// 	const tabId = useTabStore((s) => s.activeTabIdByNote[noteId] ?? null);
// 	const setActiveTab = useTabStore((s) => s.setActiveTab);
// 	const tab = useTabStore((s) => s.tabs[noteId]?.[tabId ?? ""]);
// 	return {
// 		selectedTabId: tabId,
// 		selectedTab: tab ?? null,
// 		setSelectedTab: (tabId: string) => setActiveTab(noteId, tabId),
// 	};
// };

// export function useTabDirtyStatus(tabId: string) {
// 	const isDirty = useTabStore((s) => s.dirtyTabIds.includes(tabId));
// 	const markDirty = useTabStore((s) => s.markTabDirty);
// 	const clearDirty = useTabStore((s) => s.clearTabDirty);

// 	return {
// 		isDirty,
// 		markDirty: () => markDirty(tabId),
// 		clearDirty: () => clearDirty(tabId),
// 	};
// }
