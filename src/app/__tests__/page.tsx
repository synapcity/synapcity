import fs from "fs";
import path from "path";

describe("landing page SSR", () => {
  it("does not disable server-side rendering for landing page", () => {
    const filePath = path.join(process.cwd(), "src/components/pages/GlobalPage.tsx");
    const src = fs.readFileSync(filePath, "utf8");
    expect(src).not.toMatch(/ssr:\s*false/);
  });
});