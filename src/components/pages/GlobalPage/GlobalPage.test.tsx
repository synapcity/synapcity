/**
 * @jest-environment node
 */
import React from "react";
import { renderToString } from "react-dom/server";
import GlobalPage from "./GlobalPage";

describe("GlobalPage", () => {
  it("renders minimal server-side fallback content", () => {
    const html = renderToString(<GlobalPage />);
    expect(html).toContain('class="sr-only"');
    expect(html).toContain("<h1>Synapcity</h1>");
    expect(html).toContain(
      '<div class=\"flex flex-col items-center justify-items-center size-full p-8 pb-20 gap-16 sm:p-20\"><div class=\"sr-only\"><h1>Synapcity</h1><p>Capture, connect, and create with your digital thoughtspace.</p></div></div>'
    );
  });
});
