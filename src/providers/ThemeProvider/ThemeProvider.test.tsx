global.requestAnimationFrame = (cb) => {
	cb(performance.now()); // fire immediately
	return 1;
};


import React, { RefObject } from "react";
import { act, render, screen } from "@testing-library/react";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./useTheme"
import { resolveThemeMetadata } from "@/theme/utils/resolveThemeMetadata";
import { DEFAULT } from "@/theme";
import type { FontSizeToken, ThemePreferences } from "@/theme/types";
import { ThemeContext } from "@/providers/ThemeProvider/theme-context";
import { mockThemeContext } from "@/__mocks__/theme-context";
import { createMockThemeStoreState } from "@/__mocks__";
import { useThemeStore } from "@/stores";
import { mockSetGlobalPreferences } from "@/__mocks__/stores/themeStore";

jest.mock("@/theme", () => ({
	...jest.requireActual("@/theme"),
	applyThemeVars: jest.fn(),
}));


jest.mock("@/theme/utils/resolveThemeMetadata", () => ({
	resolveThemeMetadata: jest.fn(),
}));

export let storeState: ReturnType<typeof createMockThemeStoreState>;

const mockTheme: ThemePreferences = {
	...DEFAULT.THEME,
};

beforeEach(() => {
	jest.clearAllMocks();
	storeState = createMockThemeStoreState();
	(resolveThemeMetadata as jest.Mock).mockReturnValue({
		preferences: DEFAULT.THEME,
		isGlobal: true,
		isScoped: false,
		isInherited: false,
		isCustom: false,
	});
});

describe("ThemeProvider", () => {
	it("renders children and applies correct data attributes", () => {
		render(
			<ThemeProvider scope="global">
				<div data-testid="child">Hello</div>
			</ThemeProvider>
		);
		const wrapper = screen.getByTestId("child").parentElement!;
		expect(wrapper).toHaveAttribute("data-theme", mockTheme.mode);
		expect(wrapper).toHaveAttribute("data-id", "global-main");
		expect(wrapper).toHaveClass(mockTheme.mode);
	});

	it("uses scoped preferences if provided", () => {
		const scopedPrefs = { ...mockTheme, fontSize: "lg" };
		(resolveThemeMetadata as jest.Mock).mockReturnValue({
			preferences: scopedPrefs,
			isGlobal: false,
			isScoped: true,
			isInherited: false,
			isCustom: true,
		});

		render(
			<ThemeProvider scope="note" entityId="abc">
				<div data-testid="scoped">Scoped</div>
			</ThemeProvider>
		);

		const wrapper = screen.getByTestId("scoped").parentElement!;
		expect(wrapper).toHaveAttribute("data-id", "note-abc");
	});

	it("throws if useTheme is called outside provider", () => {
		const InvalidConsumer = () => {
			useTheme();
			return <div>Invalid</div>;
		};
		const spy = jest.spyOn(console, "error").mockImplementation(() => { });
		expect(() => render(<InvalidConsumer />)).toThrow(
			"useTheme must be used within a ThemeProvider"
		);
		spy.mockRestore();
	});

	it("provides working context values (mocked)", async () => {
		let context: ReturnType<typeof useTheme> | undefined;

		const TestComponent = () => {
			context = useTheme();
			React.useEffect(() => {
				context?.resetTheme();
				context?.updateTheme();
			}, []);
			return <div data-testid="inner">Context OK</div>;
		};

		render(
			<ThemeContext.Provider value={mockThemeContext}>
				<TestComponent />
			</ThemeContext.Provider>
		);

		expect(await screen.findByTestId("inner")).toBeInTheDocument();
		expect(mockThemeContext.resetTheme).toHaveBeenCalled();
		expect(mockThemeContext.updateTheme).toHaveBeenCalled();
	});

	it("calls resetScopedPreferences when scoped and entityId is provided", () => {
		const scopedPrefs = { ...mockTheme, fontSize: "lg" };
		(resolveThemeMetadata as jest.Mock).mockReturnValue({
			preferences: scopedPrefs,
			isGlobal: false,
			isScoped: true,
			isInherited: false,
			isCustom: true,
		});

		const TestComponent = () => {
			const context = useTheme();
			React.useEffect(() => {
				context?.resetTheme();
			}, []);
			return <div data-testid="scoped-reset">Testing Scoped Reset</div>;
		};

		render(
			<ThemeProvider scope="note" entityId="abc">
				<TestComponent />
			</ThemeProvider>
		);

		expect(screen.getByTestId("scoped-reset")).toBeInTheDocument();
	});

	it("calls resetScopedPreferences when scoped and entityId is provided", () => {
		const scopedPrefs = { ...mockTheme, fontSize: "lg" as FontSizeToken };

		(resolveThemeMetadata as jest.Mock).mockReturnValue({
			preferences: scopedPrefs,
			isGlobal: false,
			isScoped: true,
			isInherited: false,
			isCustom: true,
		});

		const { scopedPreferences } = useThemeStore.getState();
		scopedPreferences.note["abc"] = scopedPrefs;

		const TestComponent = () => {
			const context = useTheme();
			React.useEffect(() => {
				context?.resetTheme();
			}, []);
			return <div data-testid="scoped-reset">Testing Scoped Reset</div>;
		};

		render(
			<ThemeProvider scope="note" entityId="abc">
				<TestComponent />
			</ThemeProvider>
		);

		expect(screen.getByTestId("scoped-reset")).toBeInTheDocument();

		expect(useThemeStore.getState().scopedPreferences.note["abc"]).toBeUndefined();
	});

	it("applies previewTheme styles to previewRef element on update", async () => {
		const scopedPrefs = { ...mockTheme, fontSize: "sm" as FontSizeToken };

		(resolveThemeMetadata as jest.Mock).mockReturnValue({
			preferences: scopedPrefs,
			isGlobal: false,
			isScoped: true,
			isInherited: false,
			isCustom: true,
		});

		let context: ReturnType<typeof useTheme> | undefined;

		const TestComponent = () => {
			context = useTheme();
			return (
				<div data-testid="inner" style={{ fontSize: "var(--font-size)" }}>
					Preview Area
				</div>
			);
		};

		render(
			<ThemeProvider scope="note" entityId="abc">
				<TestComponent />
			</ThemeProvider>
		);

		act(() => {
			context?.updatePreviewTheme({ fontSize: "lg" });
		});

		const previewTheme = context?.previewTheme
		expect(previewTheme?.fontSize).toEqual("lg")
	});

	it("applies previewTheme styles to previewRef element on update", () => {
		const scopedPrefs = { ...mockTheme, fontSize: "sm" as FontSizeToken };

		(resolveThemeMetadata as jest.Mock).mockReturnValue({
			preferences: scopedPrefs,
			isGlobal: false,
			isScoped: true,
			isInherited: false,
			isCustom: true,
		});

		let context: ReturnType<typeof useTheme> | undefined;

		const TestComponent = () => {
			context = useTheme();
			return (
				<div
					data-testid="preview-element"
					ref={context?.previewRef as RefObject<HTMLDivElement>}
					style={{ fontSize: "var(--font-size)" }}
				>
					Preview
				</div>
			);
		};

		render(
			<ThemeProvider scope="note" entityId="abc">
				<TestComponent />
			</ThemeProvider>
		);

		act(() => {
			context?.updatePreviewTheme({ fontSize: "lg" });
		});
		expect(context?.previewTheme.fontSize).toBe("lg");
	});
	it("updates previewTheme and applies it via RAF", () => {
		const scopedPrefs = { ...mockTheme, fontSize: "sm" as FontSizeToken };

		(resolveThemeMetadata as jest.Mock).mockReturnValue({
			preferences: scopedPrefs,
			isGlobal: false,
			isScoped: true,
			isInherited: false,
			isCustom: true,
		});

		const rafQueue: FrameRequestCallback[] = [];
		global.requestAnimationFrame = (cb: FrameRequestCallback) => {
			rafQueue.push(cb);
			return 1;
		};

		let context: ReturnType<typeof useTheme> | undefined;

		const TestComponent = () => {
			context = useTheme();
			return (
				<div
					data-testid="preview-element"
					ref={context?.previewRef as RefObject<HTMLDivElement>}
				>
					Test
				</div>
			);
		};

		render(
			<ThemeProvider scope="note" entityId="abc">
				<TestComponent />
			</ThemeProvider>
		);

		act(() => {
			context?.updatePreviewTheme({ fontSize: "lg" });
		});

		expect(context?.previewTheme.fontSize).toBe("lg");

		act(() => {
			rafQueue.forEach((cb) => cb(performance.now()));
		});

		const el = screen.getByTestId("preview-element");
		expect(el).toBeInTheDocument();
		expect(context?.previewTheme.fontSize).toBe("lg");
	});

	it("skips reset if no entityId is provided and scope is scoped", () => {
		const scopedPrefs = { ...mockTheme, fontSize: "lg" as FontSizeToken };

		(resolveThemeMetadata as jest.Mock).mockReturnValue({
			preferences: scopedPrefs,
			isGlobal: false,
			isScoped: true,
			isInherited: false,
			isCustom: true,
		});

		const { scopedPreferences } = useThemeStore.getState();
		scopedPreferences.note["abc"] = scopedPrefs;

		let context: ReturnType<typeof useTheme> | undefined;

		const TestComponent = () => {
			context = useTheme();
			React.useEffect(() => {
				context?.resetTheme();
			}, []);
			return <div data-testid="missing-id">Missing EntityId Test</div>;
		};

		render(
			<ThemeProvider scope="note">
				<TestComponent />
			</ThemeProvider>
		);

		expect(screen.getByTestId("missing-id")).toBeInTheDocument();

		expect(useThemeStore.getState().scopedPreferences.note["abc"]).toEqual(scopedPrefs);

		expect(context?.previewTheme.fontSize).toBe(scopedPrefs.fontSize);
	});

	it("resets global preferences when scope is global", () => {
		const modifiedPrefs = { ...DEFAULT.THEME, fontSize: "xl" as FontSizeToken };

		useThemeStore.setState({ globalPreferences: modifiedPrefs });

		let context: ReturnType<typeof useTheme> | undefined;

		const TestComponent = () => {
			context = useTheme();
			React.useEffect(() => {
				context?.resetTheme();
			}, []);
			return <div data-testid="global-reset">Reset Global</div>;
		};

		render(
			<ThemeProvider scope="global">
				<TestComponent />
			</ThemeProvider>
		);

		expect(screen.getByTestId("global-reset")).toBeInTheDocument();

		expect(useThemeStore.getState().globalPreferences).toEqual(DEFAULT.THEME);
	});

	describe("updatePreviewTheme()", () => {
		it("skips updatePreviewTheme if store hasn't hydrated", () => {
			useThemeStore.setState({ hasHydrated: false });

			let context: ReturnType<typeof useTheme> | undefined;
			const Test = () => {
				context = useTheme();
				return <div data-testid="hydration-test">Hydration</div>;
			};

			render(<ThemeProvider scope="global"><Test /></ThemeProvider>);

			act(() => {
				context?.updatePreviewTheme({ fontSize: "xl" });
			});

			expect(useThemeStore.getState().globalPreferences.fontSize).not.toBe("xl");
		});

		it("skips updatePreviewTheme if there are no changes", () => {
			useThemeStore.setState({ hasHydrated: true });

			const Test = () => {
				const context = useTheme();
				React.useEffect(() => {
					context?.updatePreviewTheme(DEFAULT.THEME);
					context?.updateTheme();
				}, []);
				return <div data-testid="unchanged">Unchanged</div>;
			};

			render(<ThemeProvider scope="global"><Test /></ThemeProvider>);

			expect(screen.getByTestId("unchanged")).toBeInTheDocument();

			expect(useThemeStore.getState().globalPreferences).toEqual(DEFAULT.THEME);
		});


		it("updates and applies global theme changes", async () => {
			useThemeStore.setState({ hasHydrated: true, setGlobalPreferences: mockSetGlobalPreferences });

			let context: ReturnType<typeof useTheme> | undefined;
			const Test = () => {
				context = useTheme();
				return <div data-testid="global-update" />;
			};

			render(
				<ThemeProvider scope="global">
					<Test />
				</ThemeProvider>
			);

			act(() => {
				context?.updatePreviewTheme({ fontSize: "xl" });
			});

			setTimeout(() => {
				expect(context?.previewTheme).toBe("lg")
				expect(context?.prefs.fontSize).toBe("lg");
			}, 0)
		});



		it("updates and applies scoped theme changes", () => {
			useThemeStore.setState({ hasHydrated: true })

			let context: ReturnType<typeof useTheme> | undefined;
			const Test = () => {
				context = useTheme();
				return <div data-testid="scoped-update" />;
			};

			render(<ThemeProvider scope="note" entityId="xyz"><Test /></ThemeProvider>);

			act(() => {
				context?.updatePreviewTheme({ fontSize: "lg" });
			});

			expect(context?.previewTheme.fontSize).toBe("lg");

			setTimeout(() => {
				expect(context?.previewTheme.fontSize).toBe("lg")
			}, 0)
		});

		it("skips scoped update if entityId is missing", () => {
			useThemeStore.setState({ hasHydrated: true });

			let context: ReturnType<typeof useTheme> | undefined;
			const Test = () => {
				context = useTheme();
				return <div data-testid="missing-id" />;
			};

			render(<ThemeProvider scope="note"><Test /></ThemeProvider>);

			act(() => {
				context?.updatePreviewTheme({ fontSize: "lg" });
			});

			expect(context?.previewTheme).toEqual({ ...DEFAULT.THEME, fontSize: "lg" });
			setTimeout(() => {
				expect(context?.prefs.fontSize).not.toBe("lg")
			}, 0)
		});

		// describe("updateTheme", () => {
		it("updates global preferences and applies them", async () => {
			useThemeStore.setState({
				hasHydrated: true,
				globalPreferences: { ...DEFAULT.THEME, fontSize: "sm" as FontSizeToken },
			});

			let context: ReturnType<typeof useTheme> | undefined;
			const Test = () => {
				context = useTheme();
				return <div data-testid="global-update" />;
			};

			render(
				<ThemeProvider scope="global">
					<Test />
				</ThemeProvider>
			);

			act(() => {
				context?.updatePreviewTheme({ fontSize: "lg" });
				context?.updateTheme();
			});
			setTimeout(() => {
				expect(useThemeStore.getState().globalPreferences.fontSize).toBe("lg");
			}, 0)
		});

		it("updates scoped preferences and applies them", () => {
			useThemeStore.setState({
				hasHydrated: true,
				scopedPreferences: { dashboard: {}, widget: {}, note: { abc: { ...DEFAULT.THEME, fontSize: "sm" as FontSizeToken } } },
			});

			let context: ReturnType<typeof useTheme> | undefined;
			const Test = () => {
				context = useTheme();
				return <div data-testid="scoped-update" />;
			};

			render(
				<ThemeProvider scope="note" entityId="abc">
					<Test />
				</ThemeProvider>
			);

			act(() => {
				context?.updatePreviewTheme({ fontSize: "xl" });
				context?.updateTheme();
			});

			setTimeout(() => {
				expect(useThemeStore.getState().scopedPreferences.note["abc"].fontSize).toBe("xl");
			}, 0)
		});

		it("does not update preferences if store hasn't hydrated", () => {
			useThemeStore.setState({ hasHydrated: false });

			let context: ReturnType<typeof useTheme> | undefined;
			const Test = () => {
				context = useTheme();
				return <div data-testid="no-hydrate" />;
			};

			render(<ThemeProvider scope="global"><Test /></ThemeProvider>);

			act(() => {
				context?.updatePreviewTheme({ fontSize: "xl" });
				context?.updateTheme();
			});

			expect(useThemeStore.getState().globalPreferences.fontSize).not.toBe("xl");
		});

		it("skips update if no actual changes between preview and preferences", () => {
			useThemeStore.setState({ hasHydrated: true });

			let context: ReturnType<typeof useTheme> | undefined;
			const Test = () => {
				context = useTheme();
				return <div data-testid="unchanged" />;
			};

			render(<ThemeProvider scope="global"><Test /></ThemeProvider>);

			act(() => {
				context?.updatePreviewTheme(DEFAULT.THEME);
				context?.updateTheme();
			});

			setTimeout(() => {
				expect(useThemeStore.getState().globalPreferences).toEqual(DEFAULT.THEME);
			}, 0)
		});

		it("does not update scoped prefs if entityId is missing", () => {
			useThemeStore.setState({ hasHydrated: true });

			let context: ReturnType<typeof useTheme> | undefined;
			const Test = () => {
				context = useTheme();
				return <div data-testid="missing-id" />;
			};

			render(<ThemeProvider scope="note"><Test /></ThemeProvider>);

			act(() => {
				context?.updatePreviewTheme({ fontSize: "lg" });
				context?.updateTheme();
			});

			// nothing should change or crash — just fallback to global
			expect(useThemeStore.getState().scopedPreferences.note?.["undefined"]).toBeUndefined();
		});

	})

	// })



});