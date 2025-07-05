import { testId } from "./testId";

interface ProcessEnv {
	readonly NODE_ENV?: string;
}
describe("testId utility", () => {
	const originalEnv = process.env.NODE_ENV;

	afterEach(() => {
		(process.env as any).NODE_ENV = originalEnv;
	});

	it("returns data-testid when NODE_ENV is 'test'", () => {
		(process.env as any).NODE_ENV = "test";
		expect(testId("my-element")).toEqual({ "data-testid": "my-element" });
	});

	it("returns empty object when NODE_ENV is 'development'", () => {
		(process.env as any).NODE_ENV = "development";
		expect(testId("my-element")).toEqual({});
	});

	it("returns empty object when NODE_ENV is 'production'", () => {
		(process.env as any).NODE_ENV = "production";
		expect(testId("my-element")).toEqual({});
	});
});
