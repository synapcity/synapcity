import fs from "fs";
import path from "path";

describe("landing page SSR", () => {
  it("disables server-side rendering for landing page", () => {
    const filePath = path.join(process.cwd(), "src/app/ClientGlobalPage.tsx");
    const src = fs.readFileSync(filePath, "utf8");
    expect(src).toMatch(/ssr:\s*false/);
  });
});