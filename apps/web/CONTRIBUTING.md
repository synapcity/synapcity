# Contributing to Synapcity

Thanks for your interest! We welcome contributions that improve quality, performance, and UX.

## Ground Rules

- Be kind and constructive.
- Small, focused PRs are easier to review.
- Prefer tests and docs alongside code changes.

## Development Setup

- Node 20+, PNPM 9+
- Monorepo tools: Turborepo + PNPM
- Run: `pnpm install` then `pnpm build` / `pnpm dev`

## Branching & Commits

- Branch off `main`.
- Use **Conventional Commits** (e.g., `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
- Example: `feat(editor): add slash command menu`

## Tests & Lint

- Unit: Jest + RTL
- E2E: Playwright
- Lint: ESLint, TypeScript
- Before pushing: `pnpm lint && pnpm test`

## Pull Request Checklist

- [ ] Title uses Conventional Commits
- [ ] Tests added/updated
- [ ] Storybook updated (if UI change)
- [ ] Docs updated (README/ROADMAP/CHANGELOG if relevant)

## Reporting Issues

- Use issue templates. Include repro steps, expected vs actual, screenshots/logs.

## Code of Conduct

By participating, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

By contributing, you agree your contributions are licensed under the [MIT License](./LICENSE).
