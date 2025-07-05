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
