import React from "react";
import { renderToString } from "react-dom/server";
import GlobalPage from "./GlobalPage";

describe("GlobalPage", () => {
  it("renders minimal server-side fallback content", () => {
    const html = renderToString(<GlobalPage />);
    expect(html).toContain('class="sr-only"');
    expect(html).toContain('<h1>Synapcity</h1>');
    expect(html).not.toContain('<p>Capture, connect, and create with your digital thoughtspace.</p>');
  });
});