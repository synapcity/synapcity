import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("NotFound page", () => {
  it("displays the 404 page for unknown routes", async () => {
    render(<NotFound />);
    expect(
      await screen.findByText(/We couldn’t find the page you were looking for./i)
    ).toBeInTheDocument();
  });
});
