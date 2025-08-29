import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@/(.*)$": ["<rootDir>/src/$1"],
    "^nanoid$": ["<rootDir>/__mocks__/nanoid.ts"],
    "^react-resizable-panels$": ["<rootDir>/__mocks__/react-resizable-panels.tsx"],
    "^@/lib/data/sidebar/defaultNotePanels$": ["<rootDir>/test/__mocks__/defaultNotePanels.ts"],
    "^@/lib/data/sidebar/defaultDashboardPanels$": [
      "<rootDir>/test/__mocks__/defaultDashboardPanels.ts",
    ],
        '^react-dom/server$': 'react-dom/server.node',
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  testTimeout: 10000,
  testPathIgnorePatterns: ["/node_modules/", "/archives/", "<rootDir>/src/app/__tests__"],
  transformIgnorePatterns: ["node_modules/(?!(nanoid|lodash-es)/)"],
} satisfies Config;

export default createJestConfig(config);
