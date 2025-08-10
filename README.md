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
