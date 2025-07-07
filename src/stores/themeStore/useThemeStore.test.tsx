import { createStore, StoreApi } from "zustand";
import { ScopedThemeState, themeStoreInitializer } from "@/stores/themeStore";
import { DEFAULT } from "@/theme/defaults";
import { getDefaultTheme } from "@/theme/utils";
import { ThemeMode } from "@/theme";

describe('themeStore', () => {
	let testStore: StoreApi<ScopedThemeState>;

	beforeEach(() => {
		testStore = createStore<ScopedThemeState>(themeStoreInitializer);
	});

	it("can toggle global mode", () => {
		testStore.getState().setGlobalPreferences({ mode: "light" });
		testStore.getState().toggleGlobalMode();
		expect(testStore.getState().globalPreferences.mode).toBe("dark");
	});
	it("initializes with default theme", () => {
		const state = testStore.getState();
		expect(state.globalPreferences).toEqual(DEFAULT.THEME);
	});

	it("can set global preferences", () => {
		testStore.getState().setGlobalPreferences({ fontSize: "lg" });
		expect(testStore.getState().globalPreferences.fontSize).toBe("lg");
	});

	it("can reset global preferences", () => {
		testStore.getState().setGlobalPreferences({ fontSize: "lg" });
		testStore.getState().resetGlobalPreferences();
		expect(testStore.getState().globalPreferences).toEqual(DEFAULT.THEME);
	});

	it("can init and set scoped preferences", () => {
		testStore.getState().initScopedPreferences("note", "abc");
		testStore.getState().setPreferences("note", "abc", { fontSize: "xl" });
		expect(testStore.getState().scopedPreferences.note["abc"].fontSize).toBe(
			"xl"
		);
	});

	it("can get scoped preferences that inherit", () => {
		testStore.getState().initScopedPreferences("note", "abc");
		testStore
			.getState()
			.setPreferences("note", "abc", { inheritsFromGlobalTheme: true });
		const pref = testStore.getState().getPreferences("note", "abc");
		expect(pref.preferences).toEqual(DEFAULT.THEME);
	});

	it("can reset scoped preferences", () => {
		testStore.getState().initScopedPreferences("dashboard", "dash-1");
		testStore
			.getState()
			.setPreferences("dashboard", "dash-1", { fontSize: "sm" });
		testStore.getState().resetScopedPreferences("dashboard", "dash-1");
		expect(
			testStore.getState().scopedPreferences.dashboard["dash-1"]
		).toBeUndefined();
	});

	it("can toggle global mode", () => {
		testStore.getState().setGlobalPreferences({ mode: "light" });
		testStore.getState().toggleGlobalMode();
		expect(testStore.getState().globalPreferences.mode).toBe("dark");
	});

	it("can toggle scoped mode independently", () => {
		testStore.getState().initScopedPreferences("widget", "widget-1");
		testStore
			.getState()
			.setPreferences("widget", "widget-1", { mode: "light" });
		testStore.getState().toggleScopedMode("widget", "widget-1");
		expect(
			testStore.getState().scopedPreferences.widget["widget-1"].mode
		).toBe("dark");
	});

	it("merges scoped preferences with default theme if not inheriting", () => {
		testStore.getState().initScopedPreferences("note", "merge-test");

		testStore.getState().setPreferences("note", "merge-test", {
			fontSize: "2xl",
			inheritsFromGlobalTheme: false,
		});

		const result = testStore.getState().getPreferences("note", "merge-test");

		expect(result.preferences.fontSize).toBe("2xl");
		expect(result.preferences.mode).toBe(DEFAULT.MODE);
		expect(result.preferences).toMatchObject({
			...getDefaultTheme(DEFAULT.MODE as ThemeMode),
			fontSize: "2xl",
			inheritsFromGlobalTheme: false
		});

	});
	it("returns globalPreferences when getPreferences is called without id", () => {
		const result = testStore.getState().getPreferences("note");
		expect(result.preferences).toEqual(DEFAULT.THEME);
	});

	it("uses fallback when globalPreferences is undefined", () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		testStore.setState({ ...testStore.getState(), globalPreferences: undefined as any });
		testStore.getState().setGlobalPreferences({ fontSize: "xl" });

		expect(testStore.getState().globalPreferences.fontSize).toBe("xl");
	});

	it("toggles global mode from dark to light", () => {
		testStore.getState().setGlobalPreferences({ mode: "dark" });
		testStore.getState().toggleGlobalMode();
		expect(testStore.getState().globalPreferences.mode).toBe("light");
	});

	it("falls back to global mode when scoped mode is undefined", () => {
		testStore.getState().initScopedPreferences("note", "fallback-test");

		testStore.setState((state) => ({
			...state,
			scopedPreferences: {
				...state.scopedPreferences,
				note: {
					...state.scopedPreferences.note,
					["fallback-test"]: {
						...state.scopedPreferences.note["fallback-test"],
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						mode: undefined as any,
					},
				},
			},
		}));

		testStore.getState().setGlobalPreferences({ mode: "light" });
		testStore.getState().toggleScopedMode("note", "fallback-test");

		expect(testStore.getState().scopedPreferences.note["fallback-test"].mode).toBe("dark");
	});
	it("toggles scoped mode from dark to light", () => {
		testStore.getState().initScopedPreferences("note", "toggle-test");

		testStore.getState().setPreferences("note", "toggle-test", {
			mode: "dark",
		});

		testStore.getState().toggleScopedMode("note", "toggle-test");

		expect(
			testStore.getState().scopedPreferences.note["toggle-test"].mode
		).toBe("light");
	});


});
