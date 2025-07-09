import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./useTheme";
import { resolveThemeMetadata } from "@/theme/utils/resolveThemeMetadata";
import { applyThemeVars, DEFAULT } from "@/theme";
import { useThemeStore } from "@/stores";
// import type { ThemePreferences } from "@/theme/types";
// const mockTheme: ThemePreferences = { ...DEFAULT.THEME };

jest.mock("@/theme", () => ({
	...jest.requireActual("@/theme"),
	applyThemeVars: jest.fn(),
}));

jest.mock("@/theme/utils/resolveThemeMetadata", () => ({
	resolveThemeMetadata: jest.fn(),
}));


describe("ThemeProvider Additional Tests", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		useThemeStore.setState({
			hasHydrated: true,
			globalPreferences: DEFAULT.THEME,
			scopedPreferences: { note: {}, dashboard: {}, widget: {} },
		});

		(resolveThemeMetadata as jest.Mock).mockReturnValue({
			preferences: DEFAULT.THEME,
			isGlobal: true,
			isScoped: false,
			isInherited: false,
			isCustom: false,
		});
	});

	it("renders a Spinner if theme store has not hydrated", () => {
		useThemeStore.setState({ hasHydrated: false });

		render(
			<ThemeProvider scope="global">
				<div data-testid="child">Hello</div>
			</ThemeProvider>
		);

		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	it("applies styles to document.body for global scope", () => {
		render(
			<ThemeProvider scope="global">
				<div data-testid="child">Hello</div>
			</ThemeProvider>
		);

		expect(applyThemeVars).toHaveBeenCalledWith({
			preferences: DEFAULT.THEME,
			element: document.body,
		});
	});

	it("applies styles to scoped targetRef for scoped scope", () => {
		(resolveThemeMetadata as jest.Mock).mockReturnValue({
			preferences: DEFAULT.THEME,
			isGlobal: false,
			isScoped: true,
			isInherited: false,
			isCustom: true,
		});

		render(
			<ThemeProvider scope="note" entityId="abc">
				<div data-testid="child">Hello</div>
			</ThemeProvider>
		);

		const wrapper = screen.getByTestId("child").parentElement!;
		expect(applyThemeVars).toHaveBeenCalledWith(
			expect.objectContaining({
				preferences: expect.any(Object),
				element: wrapper,
			})
		);
	});

	it("generates correct id based on scope and entityId", () => {
		render(
			<ThemeProvider scope="note" entityId="xyz">
				<div data-testid="id-check" />
			</ThemeProvider>
		);

		const wrapper = screen.getByTestId("id-check").parentElement!;
		expect(wrapper).toHaveAttribute("data-id", "note-xyz");
	});

	it("provides full theme context values", () => {
		let context: ReturnType<typeof useTheme> | undefined;

		const Consumer = () => {
			context = useTheme();
			return <div data-testid="consumer" />;
		};

		render(
			<ThemeProvider scope="global">
				<Consumer />
			</ThemeProvider>
		);

		expect(context?.updateFontFamily).toBeInstanceOf(Function);
		expect(context?.resetTheme).toBeInstanceOf(Function);
		expect(context?.scope).toBe("global");
		expect(context?.id).toBe("global-main");
	});
});