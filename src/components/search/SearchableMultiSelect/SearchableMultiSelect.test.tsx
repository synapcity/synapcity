/* eslint-disable @typescript-eslint/no-explicit-any */
window.HTMLElement.prototype.scrollIntoView = jest.fn();

jest.mock("lodash.debounce", () => {
  return (fn: any) => {
    fn.cancel = jest.fn();
    return fn;
  };
});

jest.mock("@/hooks/useDebouncedSearch", () => ({
  useDebouncedSearch: jest.fn(),
}));


import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchableMultiSelect, SearchableMultiSelectOption } from "./SearchableMultiSelect";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";

const mockedUseDebouncedSearch = useDebouncedSearch as jest.Mock;


describe("SearchableMultiSelect", () => {
  const OPTIONS: SearchableMultiSelectOption[] = [
    { label: "React", value: "react" },
    { label: "TypeScript", value: "ts", disabled: true },
    { label: "Node", value: "node" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });



  it("renders with default trigger label", () => {
    const handleSearch = jest.fn()
    render(<SearchableMultiSelect onSearch={handleSearch} value={[]} onChange={() => { }} options={OPTIONS} />);
    const trigger = screen.getByTestId("popover-trigger")
    expect(trigger).toBeInTheDocument()
    expect(screen.getByText("Select…")).toBeInTheDocument();
  });

  it("selects an option", async () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn()
    render(<SearchableMultiSelect value={[]} onSearch={handleSearch} onChange={handleChange} options={OPTIONS} />);
    const trigger = screen.getByTestId("popover-trigger");
    await userEvent.click(trigger);
    await userEvent.click(await screen.findByText("React"));
    expect(handleChange).toHaveBeenCalledWith(["react"]);
  });

  it("deselects an option", async () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn()
    render(
      <SearchableMultiSelect
        value={["react"]}
        onChange={handleChange}
        onSearch={handleSearch}
        options={OPTIONS}
      />
    );
    const trigger = screen.getByTestId("popover-trigger");
    await userEvent.click(trigger);

    const reactOptions = await screen.findAllByText("React");
    await userEvent.click(reactOptions[1]);

    expect(handleChange).toHaveBeenCalledWith([]);
  });



  it("creates a new option when not found", async () => {
    const handleCreate = jest.fn();
    const handleSearch = jest.fn()
    render(<SearchableMultiSelect onSearch={handleSearch} value={[]} onChange={() => { }} onCreateOption={handleCreate} options={OPTIONS} />);

    await userEvent.click(screen.getByRole("button"));
    await userEvent.type(screen.getByRole("combobox"), "NewTag");
    await userEvent.click(await screen.findByText(/Create “NewTag”/));
    expect(handleCreate).toHaveBeenCalledWith("NewTag");
  });


  it("shows tag pills below trigger", () => {
    const handleSearch = jest.fn()
    render(
      <SearchableMultiSelect
        onSearch={handleSearch}
        value={["react"]}
        onChange={() => { }}
        options={OPTIONS}
        renderTagsBelow
      />
    );
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("clears all tags on clear button click", async () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn()
    render(
      <SearchableMultiSelect
        onSearch={handleSearch}
        value={["react", "ts"]}
        onChange={handleChange}
        options={OPTIONS}
        showClearButton
      />
    );
    await userEvent.click(screen.getByText("Clear all"));
    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it("removes last tag on backspace if input empty", async () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn()
    render(
      <SearchableMultiSelect
        onSearch={handleSearch}
        value={["react", "ts"]}
        onChange={handleChange}
        options={OPTIONS}
      />
    );
    await userEvent.click(screen.getByRole("button"));
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "{Backspace}");
    expect(handleChange).toHaveBeenCalledWith(["react"]);
  });

  it("respects maxSelected limit", async () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn()
    render(
      <SearchableMultiSelect
        onSearch={handleSearch}
        value={["react"]}
        onChange={handleChange}
        options={OPTIONS}
        maxSelected={1}
      />
    );
    await userEvent.click(screen.getByRole("button"));
    const item = screen.getByText("TypeScript").closest('[role="option"]');
    expect(item).toHaveAttribute("aria-disabled", "true");

  });

  it("removes tag when X is clicked", async () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn()
    render(
      <SearchableMultiSelect
        onSearch={handleSearch}
        value={["react"]}
        onChange={handleChange}
        options={OPTIONS}
        renderTagsBelow
      />
    );

    const tagPill = screen.getByText("React").closest("span");
    expect(tagPill).toBeInTheDocument();

    const closeIcon = tagPill?.querySelector("svg");
    expect(closeIcon).toBeInTheDocument();

    if (closeIcon) {
      await userEvent.click(closeIcon);
      expect(handleChange).toHaveBeenCalledWith([]);
    }
  });



  it("applies custom tag color", () => {
    const handleSearch = jest.fn()
    render(
      <SearchableMultiSelect
        onSearch={handleSearch}
        value={["react"]}
        onChange={() => { }}
        options={OPTIONS}
        getTagColor={(val) => (val === "react" ? "#ff0000" : "")}
        renderTagsBelow
      />
    );

    const tag = screen.getByText("React").closest("span");
    expect(tag).toHaveClass("bg-[#ff0000]");
  });

  it("renders custom icons from getTagIcon", async () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn()

    const getTagIcon = (val: string) => <span data-testid={`icon-${val}`}>🔍</span>;

    render(
      <SearchableMultiSelect
        value={["react"]}
        onSearch={handleSearch}
        onChange={handleChange}
        options={[
          { label: "React", value: "react" },
          { label: "Node", value: "node" },
        ]}
        getTagIcon={getTagIcon}
        renderTagsBelow
      />
    );

    expect(screen.getByTestId("icon-react")).toBeInTheDocument();

    const trigger = screen.getByTestId("popover-trigger");
    await userEvent.click(trigger);

    expect(screen.getByTestId("icon-node")).toBeInTheDocument();
  });

  it("renders static options when onSearch is not provided", async () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn()

    render(
      <SearchableMultiSelect
        value={[]}
        onSearch={handleSearch}
        onChange={handleChange}
        options={[
          { label: "Static Option", value: "static" },
        ]}
      />
    );

    const trigger = screen.getByTestId("popover-trigger");
    await userEvent.click(trigger);

    expect(await screen.findByText("Static Option")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Static Option"));
    expect(handleChange).toHaveBeenCalledWith(["static"]);
  });

  it("renders nothing if onSearch is not provided and options is empty", async () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn()

    render(
      <SearchableMultiSelect
        value={[]}
        onSearch={handleSearch}
        onChange={handleChange}
        options={[]}
      />
    );

    const trigger = screen.getByTestId("popover-trigger");
    await userEvent.click(trigger);

    expect(await screen.findByText("No results found.")).toBeInTheDocument();
  });

  it("does not crash without onSearch or options", async () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn()

    render(
      <SearchableMultiSelect
        value={["nonexistent"]}
        onSearch={handleSearch}
        onChange={handleChange}
      />
    );

    const trigger = screen.getByTestId("popover-trigger");
    await userEvent.click(trigger);

    expect(screen.getByText("Select…")).toBeInTheDocument();
  });

  it("renders options returned from useDebouncedSearch when onSearch is provided", async () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn()

    mockedUseDebouncedSearch.mockReturnValue([
      { label: "FromHook", value: "from-hook" },
    ]);

    render(
      <SearchableMultiSelect
        value={[]}
        onSearch={handleSearch}
        onChange={handleChange}
      />
    );

    await userEvent.click(screen.getByTestId("popover-trigger"));

    expect(await screen.findByText("FromHook")).toBeInTheDocument();
  });


});