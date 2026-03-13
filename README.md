# DataCatalogue

A dataset catalogue web application built with Next.js 16 and React 19. Browse, search, and explore detailed dataset profiles with schema documentation, code examples, empirical statistics, and compliance information.

**Live demo:** [alt-data-catalogue.fly.dev](https://alt-data-catalogue.fly.dev)

## Tech Stack

- **Next.js 16** with React 19 and the App Router (RSC + client islands)
- **Velite** for build-time content compilation (MDX + JSON)
- **Tailwind CSS 4** with CSS variables and `oklch` color space
- **TypeScript** (strict mode) with **Zod** for validation
- **Fuse.js** for client-side fuzzy search
- **Three.js** (`@react-three/fiber` + `@react-three/drei`) for 3D visuals
- **shadcn/ui** + Radix primitives for accessible UI components
- **Vitest** + React Testing Library for unit/integration tests
- **Playwright** for E2E tests
- **pnpm** as the package manager

## Architecture Highlights

- **RSC + Client Island pattern**: Server Components load data at build time, passing it as props to `'use client'` islands that handle search, filtering, and sorting
- **Build-time content pipeline**: Velite compiles MDX prose + JSON structured data into typed collections with schema validation
- **Data access layer**: All consumers import from `lib/velite-data.ts` — never directly from build output
- **Static generation**: Dataset detail pages use `generateStaticParams` for full SSG
- **Accessibility**: ARIA landmarks, skip links, focus traps, keyboard navigation, scroll spy
- **Performance**: Lazy-loaded below-fold sections, code splitting via `next/dynamic`

## Getting Started

```bash
pnpm install
pnpm build:content   # compile content with Velite (required first)
pnpm dev             # start dev server at localhost:3000
```

## Scripts

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `pnpm dev`           | Start development server             |
| `pnpm build:content` | Compile content collections (Velite) |
| `pnpm build`         | Production build (runs Velite first) |
| `pnpm start`         | Serve production build               |
| `pnpm test`          | Run tests with Vitest                |
| `pnpm test:e2e`      | Run E2E tests with Playwright        |
| `pnpm lint`          | Lint with ESLint                     |
| `pnpm format`        | Format with Prettier                 |
| `pnpm analyze`       | Production build with bundle analyzer|

## Project Structure

```
app/                  # Next.js App Router pages and layouts
  data/               # Catalogue listing + dataset detail pages
components/           # Shared React components
  ui/                 # Primitives (button, dropdown, skeleton, etc.)
  mdx/                # MDX rendering components
  landing/            # Landing page sections (lazy-loaded)
content/              # Source content (compiled by Velite at build time)
  datasets/<slug>/    # Per-dataset folder: index.mdx + data.json
hooks/                # Custom React hooks (debounce, scroll spy, etc.)
lib/                  # Utilities, types, and data access layer
__tests__/            # Vitest unit/integration tests
e2e/                  # Playwright E2E tests
```

## Adding a Dataset

1. Create `content/datasets/<slug>/index.mdx` with frontmatter matching the Velite schema
2. Create `content/datasets/<slug>/data.json` with structured data (fields, SLA, examples, etc.)
3. Run `pnpm build` to validate all schemas

## CI

GitHub Actions runs lint, type-check, Vitest, and Playwright on every push and PR.

## License

MIT
