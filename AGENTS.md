# AGENTS.md - Coding Agent Guidelines

Personal homepage for Magnus Rodseth. Next.js 16 + React 19 + Tailwind CSS 4 blog/portfolio with MDX.

## Tech Stack

- **Next.js 16** (App Router, RSC)
- **React 19**
- **Tailwind CSS 4** with CSS variables
- **TypeScript** (strict mode)
- **shadcn/ui** (Radix primitives)
- **@next/mdx** + rehype-pretty-code (shiki)
- **Geist** font family
- **Node 22.x** required

## Commands

```bash
bun dev              # Start dev server (usually already running)
bun run build        # Production build
bun lint             # ESLint (flat config, typescript-eslint)
bunx shadcn@latest add <component>  # Add shadcn/ui components
```

No test suite. Verify changes with `bun lint`.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog listing + [slug] dynamic routes
│   ├── projects/          # Projects listing
│   └── */opengraph-image.tsx  # OG image generation per route
├── components/
│   ├── ui/                # shadcn/ui primitives (DO NOT EDIT directly)
│   ├── navigation/        # Navbar (desktop + mobile)
│   └── *.tsx              # Feature components (socials, testimonials, etc.)
├── config/                # Site config, navigation links
├── content/               # MDX content files
│   ├── blog/              # Blog posts (*.mdx)
│   └── pages/             # Static pages (index.mdx)
├── lib/                   # Utilities
│   ├── data/              # Static data (experience, testimonials, types)
│   ├── spotify.ts         # Spotify API integration
│   ├── github.ts          # GitHub API (Octokit REST + GraphQL)
│   ├── blog.ts            # Blog post utilities
│   ├── mdx.ts             # MDX processing
│   ├── utils.ts           # cn() helper
│   └── readingTime.ts     # Reading time calculation
├── providers/             # React context providers
│   └── theme-provider.tsx # next-themes wrapper
├── styles/                # globals.css, mdx.css
└── types/                 # Shared TypeScript types
mdx-components.tsx         # Root-level MDX component overrides
```

## Code Style

### Import Order

1. React/Next.js (`react`, `next/*`)
2. External packages (`date-fns`, `zod`, `octokit`, etc.)
3. Internal - always use `@/` alias (`@/lib/utils`, `@/components/*`)

### TypeScript

- Strict mode enabled - no implicit any
- Use `type` over `interface` for object shapes
- Define shared types in `src/types/index.ts` or `src/lib/data/types.ts`
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
- Server Components by default (App Router)

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

- `animate-slide-enter` - slide up + fade in (add `delay-300` etc. for stagger)
- `animate-fade-in` - simple fade
- `hover-rise` - translateY on hover (custom Tailwind plugin)

### Environment Variables

Add new env vars to `src/env.mjs` with Zod validation. Access via `import { env } from "@/env.mjs"`.

Current env vars:
- `GITHUB_TOKEN` - GitHub API access (optional)
- `GITHUB_USERNAME` - GitHub username (default: magnusrodseth)
- `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` / `SPOTIFY_REFRESH_TOKEN` - Spotify API (optional)
- `NEXT_PUBLIC_VERCEL_URL` - Deployment URL (optional)

### OG Images

Use `opengraph-image.tsx` files in route directories with `@vercel/og`:

```typescript
import { ImageResponse } from "@vercel/og";

export default async function Image() {
  return new ImageResponse(/* JSX */);
}
```

### MDX Content

Blog posts in `src/content/blog/*.mdx` with frontmatter:
- Processed with remark-gfm, rehype-slug, rehype-autolink-headings, rehype-pretty-code
- Code highlighting via shiki (github-dark theme)

## Key Libraries

| Library | Purpose |
|---------|---------|
| `octokit` | GitHub REST + GraphQL API |
| `next-themes` | Dark mode |
| `embla-carousel-react` | Carousels |
| `sonner` | Toast notifications |
| `react-github-calendar` | GitHub contribution calendar |
| `typewriter-effect` | Typing animations |
| `lucide-react` | Icons |

## Naming Conventions

| Type          | Convention | Example                 |
|---------------|------------|-------------------------|
| Files/folders | kebab-case | `mobile-navigation.tsx` |
| Components    | PascalCase | `MobileNavigation`      |
| Functions     | camelCase  | `formatDate`            |
| Types         | PascalCase | `SiteConfig`            |

## Do Not

- Suppress TypeScript errors (`as any`, `@ts-ignore`, `@ts-expect-error`)
- Edit `src/components/ui/*` directly (use `bunx shadcn@latest add`)
- Use CSS modules or styled-components (Tailwind only)
- Create env vars without adding to `src/env.mjs`
- Use `var` - use `const`/`let`
