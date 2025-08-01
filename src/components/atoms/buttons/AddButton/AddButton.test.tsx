import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddButton } from "./AddButton";

describe("AddButton", () => {
	it("renders the IconButton inside the wrapper", () => {
		render(<AddButton onSubmit={() => { }} />);
		const wrapper = screen.getByTestId("add-button-wrapper");
		const button = screen.getByTestId("tooltip-trigger");
		expect(wrapper).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	it("calls onSubmit when clicked", async () => {
		const handleSubmit = jest.fn();
		render(<AddButton onSubmit={handleSubmit} />);
		const button = screen.getByTestId("tooltip-trigger");
		await userEvent.click(button);
		expect(handleSubmit).toHaveBeenCalledTimes(1);
	});

	it("applies tooltip trigger and renders icon", () => {
		render(<AddButton onSubmit={() => { }} />);
		const tooltipTrigger = screen.getByTestId("tooltip-trigger");
		expect(tooltipTrigger).toBeInTheDocument();
		expect(tooltipTrigger.querySelector("svg")).toBeInTheDocument();
	});

	it("renders wrapper with correct styles", () => {
		render(<AddButton onSubmit={() => { }} />);
		const wrapper = screen.getByTestId("add-button-wrapper");
		expect(wrapper).toHaveClass("bg-(--sidebar-primary)");
		expect(wrapper).toHaveClass("rounded-lg");
	});
});
