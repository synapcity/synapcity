import { fmtTime, isTimeOrderValid } from "./time-utils";

describe("fmtTime", () => {
  it("returns empty string for undefined, null, empty, or invalid input", () => {
    expect(fmtTime(undefined)).toBe("");
    expect(fmtTime(null as unknown as string)).toBe("");
    expect(fmtTime("")).toBe("");
    expect(fmtTime("not-a-date")).toBe("");
  });

  it("returns empty string for empty input", () => {
    expect(fmtTime("")).toBe("");
  });

  it("returns empty string for undefined input", () => {
    expect(fmtTime(undefined)).toBe("");
  });

  it("formats valid ISO strings", () => {
    const result = fmtTime("2024-01-01T12:34:00Z");
    expect(result).not.toBe("");
    expect(result.toLowerCase()).not.toContain("invalid");
  });
});

describe("isTimeOrderValid", () => {
  it("returns false when an event has an invalid date", () => {
    expect(isTimeOrderValid([{ start: "bad" }])).toBe(false);
  });

    it("returns true for an empty list", () => {
    expect(isTimeOrderValid([])).toBe(true);
  });

  it("returns true for a single event", () => {
    const events = [{ start: "2024-01-01T09:00:00Z" }];
    expect(isTimeOrderValid(events)).toBe(true);
  });

  it("handles invalid date strings gracefully", () => {
    const events = [
      { start: "2024-01-01T09:00:00Z", end: "2024-01-01T10:00:00Z" },
      { start: "not-a-date" },
    ];
    expect(isTimeOrderValid(events)).toBe(false);
  });

  it("returns true for non-overlapping events regardless of order", () => {
    const events = [
      { start: "2024-01-01T12:00:00Z", end: "2024-01-01T13:00:00Z" },
      { start: "2024-01-01T10:00:00Z", end: "2024-01-01T11:00:00Z" },
    ];
    expect(isTimeOrderValid(events)).toBe(true);
  });

  it("returns false for overlapping events", () => {
    const events = [
      { start: "2024-01-01T10:00:00Z", end: "2024-01-01T11:00:00Z" },
      { start: "2024-01-01T10:30:00Z", end: "2024-01-01T12:00:00Z" },
    ];
    expect(isTimeOrderValid(events)).toBe(false);
  });

    it("returns true when times are equal", () => {
    const events = [
      { start: "2024-01-01T09:00:00Z", end: "2024-01-01T10:00:00Z" },
      { start: "2024-01-01T10:00:00Z" },
    ];
    expect(isTimeOrderValid(events)).toBe(true);
  });
});