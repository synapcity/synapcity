import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Drawer } from "./Drawer";
import { Button } from "@/components/atoms";

describe("Drawer", () => {
  it("renders trigger and opens on click", async () => {
    render(
      <Drawer title="My Drawer" description="Mine" trigger={<Button>Open</Button>}>
        <p>Drawer Content</p>
      </Drawer>
    );
    const user = userEvent.setup();

    expect(screen.queryByText("My Drawer")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(await screen.findByText("My Drawer")).toBeInTheDocument();
    expect(screen.getByText("Drawer Content")).toBeInTheDocument();
  });

  it("renders title and description conditionally with visibility", async () => {
    render(
      <Drawer
        title="Drawer Title"
        description="Some description"
        trigger={<Button>Launch</Button>}
        showTitle
        showDescription={false}
      >
        Content inside
      </Drawer>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /launch/i }));

    const title = await screen.findByText("Drawer Title");
    const description = await screen.findByText("Some description");

    expect(title).toBeVisible();
    expect(description).toHaveClass("sr-only");
  });

  it("renders footer content and footer close button", async () => {
    render(
      <Drawer
        trigger={<Button>Open</Button>}
        footer={<Button>Save</Button>}
        showFooterClose
        title="Drawer Footer"
        description="Footer"
      >
        With footer
      </Drawer>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /open/i }));
    expect(await screen.findByText("Drawer Footer")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByTestId("footer-close-button")).toBeInTheDocument();
  });

  it("calls onOpenChange when drawer opens and closes", async () => {
    const handleOpenChange = jest.fn();
    render(
      <Drawer
        trigger={<Button>Toggle</Button>}
        onOpenChange={handleOpenChange}
        title="Controlled Drawer"
        description="Drawer"
      >
        Controlled content
      </Drawer>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /toggle/i }));
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });

  it("respects open prop for controlled mode", () => {
    render(
      <Drawer open title="Always Open" description="Open">
        Persisted content
      </Drawer>
    );

    expect(screen.getByText("Always Open")).toBeInTheDocument();
    expect(screen.getByText("Persisted content")).toBeInTheDocument();
  });

  it("renders correctly with side='left'", async () => {
    render(
      <Drawer title="Left Drawer" description="Left" side="left" trigger={<Button>Left</Button>}>
        <p>Left Content</p>
      </Drawer>
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /left/i }));
    expect(await screen.findByText("Left Drawer")).toBeInTheDocument();
    expect(screen.getByText("Left Content")).toBeInTheDocument();
  });

  it("renders correctly with side='top'", async () => {
    render(
      <Drawer title="Top Drawer" description="Top" side="top" trigger={<Button>Top</Button>}>
        <p>Top Content</p>
      </Drawer>
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /top/i }));
    expect(await screen.findByText("Top Drawer")).toBeInTheDocument();
    expect(screen.getByText("Top Content")).toBeInTheDocument();
  });

  it("renders correctly with side='bottom'", async () => {
    render(
      <Drawer
        title="Bottom Drawer"
        description="Bottom"
        side="bottom"
        trigger={<Button>Bottom</Button>}
      >
        <p>Bottom Content</p>
      </Drawer>
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /bottom/i }));
    expect(await screen.findByText("Bottom Drawer")).toBeInTheDocument();
    expect(screen.getByText("Bottom Content")).toBeInTheDocument();
  });

  it("renders hidden header if title and description are not shown", async () => {
    render(
      <Drawer
        title="Hidden Title"
        description="Hidden Description"
        trigger={<Button>No Header</Button>}
        showTitle={false}
        showDescription={false}
      >
        <p>No header content</p>
      </Drawer>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /no header/i }));

    const heading = screen.getByRole("heading", { name: "Hidden Title" });
    expect(heading).toHaveClass("sr-only");

    expect(screen.getByText("Hidden Description")).toHaveClass("sr-only");
    expect(screen.getByText("No header content")).toBeInTheDocument();
  });

  it("renders fallback header when neither title nor description are provided", async () => {
    render(
      <Drawer trigger={<Button>Open Drawer</Button>}>
        <p>Body content</p>
      </Drawer>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /open drawer/i }));

    // Fallback UISheetTitle should exist and be visually hidden
    expect(screen.getByRole("heading", { name: "Drawer" })).toHaveClass("sr-only");

    // Fallback UISheetDescription should exist, even if empty
    const description = screen.getByText((content, element) => {
      return element?.getAttribute("data-slot") === "sheet-description";
    });

    expect(description).toHaveClass("sr-only");
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });
});
