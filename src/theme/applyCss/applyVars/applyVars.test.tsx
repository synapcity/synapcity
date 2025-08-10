import { applyVars } from "@/theme/applyCss/applyVars";

describe("applyVars", () => {
  it("sets CSS variables on the element", () => {
    const element = document.createElement("div");
    const vars = {
      "--test-color": "#123456",
      "--test-bg": "#ffffff",
    };

    applyVars(vars, element);

    expect(element.style.getPropertyValue("--test-color")).toBe("#123456");
    expect(element.style.getPropertyValue("--test-bg")).toBe("#ffffff");
  });

  it("does nothing if the element is null", () => {
    const vars = {
      "--should-not-apply": "#000000",
    };

    expect(() => applyVars(vars, null as unknown as HTMLElement)).not.toThrow();
  });
});
