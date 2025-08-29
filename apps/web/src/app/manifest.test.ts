/**
 * @jest-environment node
 */
import manifest from "./manifest";

describe("manifest", () => {
  it("includes expected name and icons", () => {
    const json = manifest();
    expect(json.name).toBe("SynapCity - Your Second Brain");
    expect(Array.isArray(json.icons)).toBe(true);
    expect(json.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          src: "/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        }),
        expect.objectContaining({
          src: "/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        }),
      ])
    );
  });
});
