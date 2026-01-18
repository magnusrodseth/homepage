# AGENTS.md - Coding Agent Guidelines

Personal homepage for Magnus Rodseth. Next.js 14 + @next/mdx blog/portfolio.

## Commands

```bash
bun dev          # Start dev server (usually already running)
bun run build    # Production build
bun lint         # ESLint (next/core-web-vitals)
bunx shadcn@latest add  # Add shadcn/ui components
```

No test suite. Verify changes with `bun lint`.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog listing
│   ├── projects/          # Projects listing
│   └── api/og/            # OG image generation
├── components/
│   ├── ui/                # shadcn/ui primitives (DO NOT EDIT directly)
│   ├── navigation/        # Navbar (desktop + mobile)
├── config/                # Site config, navigation links
├── lib/                   # Utilities (cn, formatDate, readingTime, mdx)
│   └── data/              # Static data (experience, testimonials)
├── styles/                # globals.css, mdx.css
└── types/                 # Shared TypeScript types
mdx-components.tsx         # Root-level MDX component overrides
```

## Code Style

### Import Order

1. React/Next.js (`react`, `next/*`)
2. External packages (`date-fns`, `zod`, etc.)
3. Internal - always use `@/` alias (`@/lib/utils`, `@/components/*`)

### TypeScript

- Strict mode enabled - no implicit any
- Use `type` over `interface` for object shapes
- Define shared types in `src/types/index.ts`
- Props naming: `ComponentNameProps`

```typescript
type ArticleLayoutProps = {
  item: Post | Project;
  headings: Heading[];
};
```

### React Components

- Function components only (no classes)
- **Default exports** for pages/layouts
- **Named exports** for UI components
- Use `forwardRef` for primitives needing ref forwarding

### Styling

Always use `cn()` for conditional Tailwind classes:

```typescript
import { cn } from "@/lib/utils";

<div className={cn("flex gap-2", isActive && "bg-primary", className)} />
```

### Typography Components

Use from `@/components/ui/typography` instead of raw HTML:

```typescript
import { H1, H2, P, Muted, Small } from "@/components/ui/typography";

<H2 className="animate-slide-enter">Title</H2>
<Muted>Secondary text</Muted>
```

### Animations

Custom `slide-enter` animation: `className="animate-slide-enter"` (add `delay-300` etc. for stagger)

### Environment Variables

Add new env vars to `src/env.mjs` with Zod validation. Access via `import { env } from "@/env.mjs"`

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files/folders | kebab-case | `mobile-navigation.tsx` |
| Components | PascalCase | `MobileNavigation` |
| Functions | camelCase | `formatDate` |
| Types | PascalCase | `SiteConfig` |

## Do Not

- Suppress TypeScript errors (`as any`, `@ts-ignore`, `@ts-expect-error`)
- Edit `src/components/ui/*` directly (use `bunx shadcn@latest add`)
- Use CSS modules or styled-components (Tailwind only)
- Create env vars without adding to `src/env.mjs`
- Use `var` - use `const`/`let`
