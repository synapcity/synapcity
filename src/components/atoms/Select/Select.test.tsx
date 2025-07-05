window.HTMLElement.prototype.scrollIntoView = jest.fn();

import * as React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { Select, type SelectOption, type GroupedSelectOption } from "./Select";

const flatOptions: SelectOption[] = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c", disabled: true },
];

const groupedOptions: GroupedSelectOption[] = [
  {
    label: "Group One",
    options: [
      { label: "Group A1", value: "a1" },
      { label: "Group A2", value: "a2" },
    ],
  },
  {
    label: "Group Two",
    options: [
      { label: "Group B1", value: "b1" },
      { label: "Group B2", value: "b2", disabled: true },
    ],
  },
];

describe("<Select />", () => {
  it("renders with label and description", () => {
    render(
      <Select
        label="Select Label"
        description="Helpful description"
        options={flatOptions}
        defaultValue="a"
      />
    );

    expect(screen.getByText("Select Label")).toBeInTheDocument();
    expect(screen.getByText("Helpful description")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveTextContent("Option A");
  });

  it("renders with an error and sets aria-invalid", () => {
    render(
      <Select
        label="Select Label"
        error="Required field"
        options={flatOptions}
      />
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Required field");
  });

  it("renders with placeholder when no value is selected", () => {
    render(
      <Select
        label="Select Label"
        placeholder="Choose one"
        options={flatOptions}
      />
    );

    expect(screen.getByRole("combobox")).toHaveTextContent("Choose one");
  });

  it("shows the selected value when controlled", () => {
    render(
      <Select
        label="Select Label"
        value="b"
        options={flatOptions}
        onValueChange={jest.fn()}
      />
    );

    expect(screen.getByRole("combobox")).toHaveTextContent("Option B");
  });

  it("calls onValueChange when a new option is selected", async () => {
    const handleChange = jest.fn();
    render(
      <Select
        label="Select Label"
        placeholder="Choose one"
        options={flatOptions}
        onValueChange={handleChange}
      />
    );

    const trigger = screen.getByRole("combobox", { name: /select label/i });
    fireEvent.click(trigger);

    const listbox = await screen.findByRole("listbox");
    const option = within(listbox).getByText("Option B");
    fireEvent.click(option);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith("b");
    });
  });

  it("does not trigger onValueChange when clicking a disabled option", async () => {
    const handleChange = jest.fn();
    render(
      <Select
        label="Select Label"
        options={flatOptions}
        onValueChange={handleChange}
      />
    );

    fireEvent.click(screen.getByRole("combobox"));

    const listbox = await screen.findByRole("listbox");
    const disabledOption = within(listbox).getByText("Option C");
    fireEvent.click(disabledOption);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders disabled select trigger", () => {
    render(
      <Select
        label="Disabled Select"
        options={flatOptions}
        disabled
      />
    );

    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("renders grouped options with labels and separators", async () => {
    render(
      <Select
        label="Grouped Select"
        placeholder="Pick one"
        groupedOptions={groupedOptions}
      />
    );

    const trigger = screen.getByRole("combobox", { name: /grouped select/i });
    fireEvent.click(trigger);

    const listbox = await screen.findByRole("listbox");

    // Labels
    expect(within(listbox).getByText("Group One")).toBeInTheDocument();
    expect(within(listbox).getByText("Group Two")).toBeInTheDocument();

    // Options
    expect(within(listbox).getByText("Group A1")).toBeInTheDocument();
    expect(within(listbox).getByText("Group A2")).toBeInTheDocument();
    expect(within(listbox).getByText("Group B1")).toBeInTheDocument();
    expect(within(listbox).getByText("Group B2")).toBeInTheDocument();

    // Separators
    const separators = within(listbox).getAllByTestId("select-separator")
    expect(separators.length).toBe(1); // One between groups
  });

  it("renders group without label and falls back to index as key", async () => {
    render(
      <Select
        label="No Label Group Test"
        placeholder="Pick"
        groupedOptions={[
          {
            // label is intentionally undefined
            options: [
              { label: "Item 1", value: "i1" },
              { label: "Item 2", value: "i2" },
            ],
          },
        ]}
      />
    );

    fireEvent.click(screen.getByRole("combobox"));
    const listbox = await screen.findByRole("listbox");

    expect(within(listbox).getByText("Item 1")).toBeInTheDocument();
    expect(within(listbox).getByText("Item 2")).toBeInTheDocument();
  });

});
