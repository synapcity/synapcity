import { flattenObject, processLexicalRow, getProcessedData } from "../data-utils";

describe("flattenObject", () => {
  it("deep flattens nested records", () => {
    const input: Record<string, unknown> = { a: { b: { c: 1 } }, d: 2 };
    const result = flattenObject(input);
    expect(result).toEqual({ "a.b.c": 1, d: 2 });
  });

  it("accepts only record objects", () => {
    const check = () => {
      // @ts-expect-error - only record objects are allowed
      flattenObject("bad");
    };
    expect(check).toBeDefined();
  });
});

describe("processLexicalRow", () => {
  it("joins arrays of text objects and leaves others intact", () => {
    const row: Record<string, unknown> = {
      name: [{ text: "Al" }, { text: "ice" }],
      other: [{ wrong: "shape" }],
    };
    const result = processLexicalRow(row);
    expect(result).toEqual({
      name: "Alice",
      other: row.other,
    });

    const res = processLexicalRow({ title: [{ text: "Hi" }] });
    // @ts-expect-error - property is unknown, not number
    const _n: number = res.title;
    void _n;
  });
});

describe("getProcessedData", () => {
  const rows: Record<string, unknown>[] = [
    { a: 1, nested: { b: 2 }, lexical: [{ text: "hi" }] },
  ];

  it("returns raw rows for 'nested'", () => {
    expect(getProcessedData(rows, "nested")).toEqual(rows);
  });

  it("processes lexical arrays", () => {
    const result = getProcessedData(rows, "lexical");
    expect(result).toEqual([{ a: 1, nested: { b: 2 }, lexical: "hi" }]);
  });

  it("flattens deeply for 'flattened'", () => {
    const result = getProcessedData(rows, "flattened");
    expect(result).toEqual([{ a: 1, "nested.b": 2, lexical: rows[0].lexical }]);
  });

  it("flattens when mergeNested is true in 'default' mode", () => {
    const result = getProcessedData(rows, "default", true);
    expect(result).toEqual([{ a: 1, "nested.b": 2, lexical: rows[0].lexical }]);
  });

  const processed = getProcessedData(rows, "lexical");
  // @ts-expect-error - lexical field is unknown, not number
  const _bad: number = processed[0].lexical;
  void _bad;
});