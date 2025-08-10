import "./src/utils/supressConsole";

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () => {
    // minimal mock so nothing breaks
    return {};
  },
});

import "@testing-library/jest-dom";
import { ResizeObserver } from "@juggle/resize-observer";
global.ResizeObserver = ResizeObserver;
import "jest-axe/extend-expect";
import { cleanup } from "@testing-library/react";

afterEach(() => {
	cleanup();
	jest.clearAllMocks();
	jest.clearAllTimers();
});
