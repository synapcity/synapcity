/* eslint-disable @typescript-eslint/no-explicit-any */
import * as utils from "./export-utils";

describe("csvCell", () => {
  it("quotes cells with commas", () => {
    expect(utils.csvCell("a,b")).toBe('"a,b"');
  });

  it("escapes internal double quotes", () => {
    expect(utils.csvCell('a "quote" b')).toBe('"a ""quote"" b"');
  });

  it("quotes cells with newlines", () => {
    expect(utils.csvCell("line1\nline2")).toBe('"line1\nline2"');
  });
});

describe("exportCsv", () => {
  it("uses RFC4180 quoting for special characters", async () => {
    let csvData = "";
    const OriginalBlob = Blob;
    class BlobMock {
      parts: any[];
      constructor(parts: any[]) {
        this.parts = parts;
        csvData = parts.join("");
      }
    }
    // @ts-expect-error override
    global.Blob = BlobMock;
    const originalCreate = (URL as any).createObjectURL;
    const originalRevoke = (URL as any).revokeObjectURL;
    (URL as any).createObjectURL = () => "";
    (URL as any).revokeObjectURL = () => {};
    const click = jest.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    const data = [
      { a: "hello, world", b: "simple" },
      { a: '"quoted"', b: "line1\nline2" },
    ];

    utils.exportCsv(data, false, "test");

    const expected = ["a,b", '"hello, world",simple', '"""quoted""","line1\nline2"'].join("\n");

    expect(csvData).toBe(expected);
    expect(csvData).not.toContain("hello\\, world");

    // restore globals
    global.Blob = OriginalBlob as any;
    (URL as any).createObjectURL = originalCreate;
    (URL as any).revokeObjectURL = originalRevoke;
    click.mockRestore();
  });
});
