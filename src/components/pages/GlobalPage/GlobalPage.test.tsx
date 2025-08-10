import React from "react";
import { renderToString } from "react-dom/server";
import GlobalPage from "./GlobalPage";

describe("GlobalPage", () => {
  it("renders server-side fallback content", () => {
    const html = renderToString(<GlobalPage />);
    expect(html).toContain('class="sr-only"');
    expect(html).toContain('<h1>Synapcity</h1>');
    expect(html).toContain('<p>Collaborative knowledge platform to map ideas and share insights.</p>');
  });
});