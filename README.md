# Synapcity

Synapcity is a customizable dashboard inspired by Tiago Forte’s Second Brain and the PARA framework. It provides a focused digital workspace where you can capture, organize, and access the information that matters most.

## Getting Started

### Prerequisites

- Node.js v20 or later
- npm (or yarn, pnpm, bun)

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file in the project root to configure environment variables.

```env
# Enable bundle analyzer during `npm run build`
ANALYZE=false

# Add additional `NEXT_PUBLIC_*` keys for API services here
```

## Testing

Run the test suite and static analysis checks before committing changes:

```bash
npm test            # Jest unit tests
npm run lint:check  # ESLint
npm run type-check  # TypeScript type check
npm run verify      # Lint and type-check together
```

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

