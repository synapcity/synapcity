import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import "@testing-library/jest-dom";

describe("Button", () => {
	it("renders children text", () => {
		render(<Button>Click Me</Button>);
		expect(screen.getByRole("button")).toHaveTextContent("Click Me");
	});

	it("renders as Slot when asChild is true", () => {
		const { container } = render(
			<Button asChild>
				<a href="/test-slot">Slot Button</a>
			</Button>
		);
		const link = container.querySelector("a");
		expect(link).toBeInTheDocument();
		expect(link).toHaveTextContent("Slot Button");
		expect(link).toHaveAttribute("href", "/test-slot");
	});

	it("renders label fallback if children are missing", () => {
		render(<Button label="Fallback Label" />);
		expect(screen.getByRole("button")).toHaveTextContent("Fallback Label");
	});

	it("renders an icon if provided", () => {
		render(<Button icon="Plus">With Icon</Button>);
		expect(screen.getByRole("button")).toBeInTheDocument();
		expect(document.querySelector("svg")).toBeInTheDocument();
	});

	it("shows spinner when loading", () => {
		render(<Button isLoading>Loading</Button>);
		const spinner = screen.getByRole("status");
		expect(spinner).toBeInTheDocument();
		expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("renders icon only button", () => {
		render(<Button icon="Trash" isIconOnly tooltip="Delete" />);
		const btn = screen.getByRole("button");
		expect(btn).toBeInTheDocument();
		expect(btn).not.toHaveTextContent("Trash");
	});

	it("applies fullWidth class when set", () => {
		render(<Button fullWidth>Wide</Button>);
		expect(screen.getByRole("button")).toHaveClass("w-full");
	});

	it("calls onClick handler", () => {
		const onClick = jest.fn();
		render(<Button onClick={onClick}>Click</Button>);
		fireEvent.click(screen.getByRole("button"));
		expect(onClick).toHaveBeenCalled();
	});

	it("sets default type to 'button'", () => {
		render(<Button>Default Type</Button>);
		expect(screen.getByRole("button")).toHaveAttribute("type", "button");
	});

	it("honors provided type", () => {
		render(<Button type="submit">Submit</Button>);
		expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
	});
	it("renders as a native button by default", () => {
		render(<Button>Click me</Button>);
		const button = screen.getByRole("button");
		expect(button.tagName.toLowerCase()).toBe("button");
		expect(button).toHaveTextContent("Click me");
	});

	it("applies custom class names", () => {
		render(<Button className="custom-class">Styled</Button>);
		expect(screen.getByRole("button")).toHaveClass("custom-class");
	});
});
