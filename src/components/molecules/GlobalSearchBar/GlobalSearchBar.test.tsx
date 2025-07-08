window.HTMLElement.prototype.scrollIntoView = jest.fn();

import { render, screen, fireEvent } from "@testing-library/react";
import { GlobalSearchBar } from "./GlobalSearchBar";
import { BookOpen, Hash, User } from "lucide-react";
import { SearchItem } from "@/theme/types";

describe("GlobalSearchBar", () => {
  const mockOnSelectNote = jest.fn();
  const mockOnSelectTag = jest.fn();
  const mockOnSelectUser = jest.fn();

  const items: SearchItem[] = [
    {
      id: "note-1",
      label: "Project Roadmap",
      type: "note",
      icon: <BookOpen data-testid="note-icon" />,
      onSelect: mockOnSelectNote,
    },
    {
      id: "tag-1",
      label: "Design System",
      type: "tag",
      icon: <Hash data-testid="tag-icon" />,
      onSelect: mockOnSelectTag,
    },
    {
      id: "user-1",
      label: "Hanaa Sadoqi",
      type: "user",
      icon: <User data-testid="user-icon" />,
      onSelect: mockOnSelectUser,
    },
  ];


  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search input", () => {
    render(<GlobalSearchBar items={items} />);
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
  });

  it("shows all grouped results initially", () => {
    render(<GlobalSearchBar items={items} />);
    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByText("Tags")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();

    expect(screen.getByText("Project Roadmap")).toBeInTheDocument();
    expect(screen.getByText("Design System")).toBeInTheDocument();
    expect(screen.getByText("Hanaa Sadoqi")).toBeInTheDocument();
  });

  it("filters results based on query", () => {
    render(<GlobalSearchBar items={items} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "hanaa" } });

    expect(screen.queryByText("Project Roadmap")).not.toBeInTheDocument();
    expect(screen.queryByText("Design System")).not.toBeInTheDocument();
    expect(screen.getByText("Hanaa Sadoqi")).toBeInTheDocument();
  });

  it("calls onSelect when item is selected", () => {
    render(<GlobalSearchBar items={items} />);
    const item = screen.getByText("Project Roadmap");
    fireEvent.click(item);

    expect(mockOnSelectNote).toHaveBeenCalledTimes(1);
  });

  it("shows 'No results' when nothing matches", () => {
    render(<GlobalSearchBar items={items} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "foobar" } });

    expect(screen.getByText("No results found.")).toBeInTheDocument();
    expect(screen.queryByText("Project Roadmap")).not.toBeInTheDocument();
  });
});
