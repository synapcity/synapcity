import { describe, it, expect, afterEach, beforeEach, jest } from "@jest/globals";

// Helper to mutate env without TS readonly errors
type MutableEnv = Omit<NodeJS.ProcessEnv, "NODE_ENV"> & { NODE_ENV?: string };
const setNodeEnv = (v?: string) => {
  const env = process.env as MutableEnv;
  if (typeof v === "undefined") delete env.NODE_ENV;
  else env.NODE_ENV = v;
};

const ORIGINAL_CONSOLE = { ...console };
const ORIGINAL_NODE_ENV = process.env.NODE_ENV;

beforeEach(() => {
  // ensure clean console before each test (module under test mutates it)
  Object.assign(console, ORIGINAL_CONSOLE);
});

afterEach(() => {
  // restore global state for other tests
  setNodeEnv(ORIGINAL_NODE_ENV);
  Object.assign(console, ORIGINAL_CONSOLE);
  jest.resetModules();
});

describe("suppressConsole", () => {
  it("silences console methods in production", async () => {
    setNodeEnv("production");
    jest.resetModules();

    await import("../supressConsole");

    // In production, the module assigns the same noop to all console methods
    expect(typeof console.log).toBe("function");
    expect(console.log).toBe(console.info);
    expect(console.log).toBe(console.warn);
    expect(console.log).toBe(console.error);
    expect(console.log).toBe(console.debug);
    expect(console.log).toBe(console.trace);

    // And they should no longer be the originals
    expect(console.log).not.toBe(ORIGINAL_CONSOLE.log);
    expect(console.info).not.toBe(ORIGINAL_CONSOLE.info);
    expect(console.warn).not.toBe(ORIGINAL_CONSOLE.warn);
    expect(console.error).not.toBe(ORIGINAL_CONSOLE.error);
    expect(console.debug).not.toBe(ORIGINAL_CONSOLE.debug);
    expect(console.trace).not.toBe(ORIGINAL_CONSOLE.trace);

    // Should be safe to call
    expect(() => {
      console.log("log");
      console.info("info");
      console.warn("warn");
      console.error("error");
      console.debug("debug");
      console.trace("trace");
    }).not.toThrow();
  });

  it("does not silence console in non-production", async () => {
    setNodeEnv("test");
    jest.resetModules();

    await import("../supressConsole");

    expect(console.log).toBe(ORIGINAL_CONSOLE.log);
    expect(console.info).toBe(ORIGINAL_CONSOLE.info);
    expect(console.warn).toBe(ORIGINAL_CONSOLE.warn);
    expect(console.error).toBe(ORIGINAL_CONSOLE.error);
    expect(console.debug).toBe(ORIGINAL_CONSOLE.debug);
    expect(console.trace).toBe(ORIGINAL_CONSOLE.trace);

    // Optional: prove it still logs by spying on console.log directly (works in jsdom)
    const logSpy = jest.spyOn(console, "log");
    console.log("visible");
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
