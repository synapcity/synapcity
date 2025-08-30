if (typeof HTMLCanvasElement !== "undefined") {
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
    value: () => {
      // minimal mock so nothing breaks
      return {};
    },
  });
}

import "@testing-library/jest-dom";
import { ResizeObserver } from "@juggle/resize-observer";
global.ResizeObserver = ResizeObserver;
import "jest-axe/extend-expect";
import { cleanup } from "@testing-library/react";

// Avoid act(...) warnings from Radix Presence during tests by rendering synchronously
jest.mock("@radix-ui/react-presence", () => ({
  __esModule: true,
  Presence: ({ children }: any) => children,
}));

// Polyfill TextEncoder/TextDecoder for Node test environment
// Some dependencies (e.g., iobuffer/fast-png/jspdf) expect these globals.
try {
  // Prefer Node's util implementation to avoid jsdom inconsistencies
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { TextEncoder, TextDecoder } = require("node:util");
  if (!global.TextEncoder) global.TextEncoder = TextEncoder;
  if (!global.TextDecoder) global.TextDecoder = TextDecoder;
} catch (_) {
  // no-op if not available; tests that need it will fail clearly
}

// Polyfill Web Crypto if missing (getRandomValues, subtle, etc.)
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { webcrypto } = require("node:crypto");
  if (!global.crypto || !global.crypto.getRandomValues) {
    global.crypto = webcrypto;
  }
} catch (_) {
  // ignore if not available
}

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  jest.clearAllTimers();
});
