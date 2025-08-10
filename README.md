# Synapcity

Synapcity is a customizable, modular workspace for building interactive dashboards and rich note‑taking experiences. It uses a widget‑based architecture so users can compose custom interfaces with drag‑and‑drop grids, persistent state, and a Lexical‑powered editor. Inspired by Tiago Forte's Second Brain and the PARA framework.

## Key Features

- **Widget system** – register reusable widgets and render them inside a dynamic grid.
- **Drag‑and‑drop layout** – rearrange dashboards using `dnd-kit` and `react-grid-layout`.
- **Rich text editing** – extensible editor built on [Lexical](https://lexical.dev/).
- **Theming and UI** – Tailwind CSS, Radix UI, and headless component primitives.
- **Persistent state** – Zustand stores for resources like notes, dashboards, and command menus.
- **Testing & Storybook** – Jest and Vitest tests with Storybook for component exploration.

## Tech Stack

- [Next.js](https://nextjs.org/) 15 and [React](https://react.dev/) 19
- TypeScript
- Zustand for state management
- Tailwind CSS and Radix UI
- `dnd-kit` and `react-grid-layout`
- Lexical rich‑text editor
- Jest, Testing Library, and Vitest
- Storybook

## Architecture Overview

The project is a single full-stack Next.js application with modular directories under `src/`:

- `src/widgets` – widget registry, renderer, and setup utilities
- `src/stores` – Zustand stores for UI and resources
- `src/lexical` – editor plugins and extensions
- `src/grid` – grid layouts and drag/drop hooks
- `src/app` – Next.js App Router pages and API routes

## Getting Started

### Prerequisites

- Node.js v20 or later
- npm (or yarn, pnpm, bun)

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Development

Start the development server with hot‑reloading:

```bash
npm run dev
```

Run Storybook for isolated component development:

```bash
npm run storybook
```

#### Dependency Stability Review

The project depends on several major front-end frameworks. Their current stability status was verified using `npm view` to inspect dist-tags.

##### Next.js

- **Version:** 15.4.6
- **Stability:** Marked as the latest release on npm, indicating a stable distribution【c02e7b†L1-L10】
- **Action:** Pinned in `package.json` and monitor release notes for future major updates.

##### React

- **Version:** 19.1.1
- **Stability:** Tagged as the latest stable release on npm【a25974†L1-L8】
- **Action:** Pinned in `package.json`; track React 20 planning once official roadmaps are published.

##### Tailwind CSS

- **Version:** 4.1.11
- **Stability:** Listed under npm's latest dist-tag, denoting a stable release【9690cb†L2】
- **Action:** Pinned in `package.json`; watch for Tailwind CSS 5 announcements.

##### Upgrade Plan

- Review upstream changelogs monthly.
- Test new major versions in a separate branch before adopting them.

### Testing

Run the unit tests:

```bash
npm test
```

Static analysis:

```bash
npm test            # Jest unit tests
npm run lint:check  # ESLint
npm run type-check  # TypeScript type check
npm run verify      # Lint and type-check together
```

#### Cypress end-to-end tests

This project is configured for Cypress end-to-end and component testing.

1. Start the dev server in a separate terminal:

   ```bash
   npm run dev
   ```

2. Run Cypress tests:

- Run e2e tests with `npm run test:cypress:e2e`.
- Run component tests with `npm run test:cypress:component`.

The configuration assumes the app is available at [http://localhost:3000](http://localhost:3000). Update the `baseUrl` in `cypress.config.ts` or set the `CYPRESS_BASE_URL` environment variable if your server runs elsewhere.

*Note:()

`npm run test:cypress:component` requires a `cypress/support/component-index.html` file. If it is missing, Cypress fails with an error like:

```terminal
Module not found: Error: Can't resolve '.../cypress/support/component-index.html' (ENOENT)
```

To run component tests locally:

1. Create `cypress/support/component-index.html` containing a root element:

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <body>
        <div id="root"></div>
      </body>
    </html>
    ```

2. Ensure `webpack.config.cjs` is present so Cypress can bundle React and TypeScript components.
3. Re-run `npm run test:cypress:component`.

#### Continuous integration

The workflow defined in `.github/cypress.yml` runs `npm run test:e2e` in GitHub Actions to exercise end-to-end tests on every pull request.

#### Troubleshooting

- Linux users may need the `Xvfb` package to run headless tests locally:

  ```bash
  sudo apt-get install xvfb
  ```
  
  Alternatively, prefix commands with `xvfb-run`.

### Production Build

Create an optimized build and start the server:

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file in the project root to configure environment variables.

| Variable | Description |
|----------|-------------|
| `ANALYZE` | Set to `true` to enable bundle analysis during `npm run build`. |

`NODE_ENV` is managed automatically by Next.js.

## Deployment

Build the application and start a production server:

```bash
npm run build
npm start
```

The project can also be deployed on platforms like Vercel.

## Contributing

Contributions are welcome! Fork the repository, create a feature branch, and open a pull request. Please ensure all tests and checks pass (`npm run verify` and `npm test`) before submitting.

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
