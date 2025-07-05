/**
 * ⚠️ This must come first, before any imports
 */
jest.mock("@/components", () => {
	// Avoid loading LinkButton here!
	return {
		__esModule: true,
		Spinner: () => <div role="status">Spinner</div>,
		Icon: ({ name }: any) => (
			<svg role="img" aria-label={name} data-testid="icon">
				{name}
			</svg>
		),
		Tooltip: ({ trigger, children, content }: any) => (
			<>
				{trigger || children}
				<div data-testid="tooltip-content">{content}</div>
			</>
		),
	};
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LinkButton } from "./LinkButton";



jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));


describe("LinkButton", () => {
	it("renders with text and href", () => {
		render(<LinkButton href="/test">Test Link</LinkButton>);
		const link = screen.getByRole("link", { name: /test link/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/test");
	});

	it("renders icon and text when icon is provided and isIconOnly is false", () => {
		render(<LinkButton href="/" icon="Plus">With Icon</LinkButton>);
		expect(screen.getByText("With Icon")).toBeInTheDocument();
		const svg = screen.getByTestId("icon");
		expect(svg).toBeInTheDocument();
	});

	it("applies correct size and variant classes", () => {
		const { container } = render(<LinkButton href="/" variant="outline" size="sm">Sized</LinkButton>);
		const link = container.querySelector("a");
		expect(link).toHaveClass("text-sm");

	});

	it("applies disabled state styles when loading", () => {
		render(
			<LinkButton href="/test" isLoading>
				Loading Link
			</LinkButton>
		);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("aria-disabled", "true");
		expect(link).toHaveClass("pointer-events-none");
		expect(screen.getByRole("status")).toBeInTheDocument(); // Spinner
	});

	it("renders icon only when isIconOnly is true", () => {
		render(
			<LinkButton href="/icon" icon="Plus" isIconOnly>
				Hidden Text
			</LinkButton>
		);
		expect(screen.getByRole("link")).toBeInTheDocument();
		expect(screen.queryByText("Hidden Text")).not.toBeInTheDocument();
	});

	it("calls onClick handler", () => {
		const onClick = jest.fn();
		render(
			<LinkButton href="/click" onClick={onClick}>
				Click Me
			</LinkButton>
		);
		fireEvent.click(screen.getByRole("link"));
		expect(onClick).toHaveBeenCalled();
	});

	it("supports fullWidth class", () => {
		render(
			<LinkButton href="/" fullWidth>
				Full Width
			</LinkButton>
		);
		expect(screen.getByRole("link")).toHaveClass("w-full");
	});

	it("shows active data-state", () => {
		render(
			<LinkButton href="/" isActive>
				Active
			</LinkButton>
		);
		expect(screen.getByRole("link")).toHaveAttribute("data-state", "active");
	});

	it("renders tooltip when tooltip prop is provided", () => {
		render(<LinkButton href="/" tooltip="Helpful tip">Hover Me</LinkButton>);
		expect(screen.getByTestId("tooltip-content")).toHaveTextContent("Helpful tip");
	});

	it("renders only spinner when iconOnly and loading", () => {
		render(<LinkButton href="/" isIconOnly isLoading icon="Plus">Hidden</LinkButton>);
		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
	});


});
