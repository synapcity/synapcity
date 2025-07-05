/// <reference types="vitest" />
/// <reference types="@storybook/addon-vitest" />
import { defineConfig } from "vitest/config";
export default defineConfig({
	test: {
		projects: [
			{
				extends: true,
				test: {
					name: "storybook",
					environment: "jsdom",
					globals: true,
					include: ["src/**/*.test.{ts,tsx}"],
					exclude: ["./archives/*"],
					browser: {
						enabled: true,
						headless: true,
						provider: "playwright",
						instances: [{ browser: "chromium" }],
					},
					deps: {
						inline: ["@testing-library/react", "@testing-library/user-event"],
					},
					setupFiles: [".storybook/vitest.setup.ts"],
				},
			},
		],
	},
});
