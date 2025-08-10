/* eslint-disable @typescript-eslint/no-explicit-any */
import getUpdatedValues from "./getUpdatedValues";

describe("getUpdatedValues", () => {
  it("returns changed values", () => {
    const oldObj = { a: 1, b: 2 };
    const newObj = { a: 1, b: 3 };
    expect(getUpdatedValues(oldObj, newObj)).toEqual({ b: 3 });
  });

  it("includes keys that only exist in new object", () => {
    const oldObj = { a: 1 };
    const newObj = { a: 1, b: 2 } as typeof oldObj & { b: number };
    expect(getUpdatedValues(oldObj as any, newObj as any)).toEqual({ b: 2 });
  });
});
