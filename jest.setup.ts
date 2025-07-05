import "@testing-library/jest-dom";
import { ResizeObserver } from "@juggle/resize-observer";
global.ResizeObserver = ResizeObserver;
import "jest-axe/extend-expect";
