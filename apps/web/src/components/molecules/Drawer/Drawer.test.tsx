import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Drawer } from "./Drawer";

describe("<Drawer />", () => {
  it("renders trigger and opens on click", async () => {
    const user = userEvent.setup();

    render(
      <Drawer title="My Drawer">
        <div>Drawer body</div>
      </Drawer>
    );

    // Closed: no dialog
    expect(screen.queryByRole("dialog")).toBeNull();

    // Click trigger
    await user.click(screen.getByRole("button", { name: /open/i }));

    // Open: dialog present and visible
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeVisible();

    // Check contents inside
    expect(within(dialog).getByText("My Drawer")).toBeInTheDocument();
    expect(within(dialog).getByText("Drawer body")).toBeInTheDocument();
  });

  it("works with a custom trigger", async () => {
    const user = userEvent.setup();

    render(
      <Drawer title="Custom Drawer" trigger={<button type="button">Launch</button>}>
        <p>Custom content</p>
      </Drawer>
    );

    await user.click(await screen.findByRole("button", { name: /launch/i }));
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("Custom content")).toBeInTheDocument();
  });
});
