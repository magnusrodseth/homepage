# AGENTS.md - Coding Agent Guidelines

Personal homepage for Magnus Rodseth. Next.js 16 + React 19 + Tailwind CSS 4 blog/portfolio with MDX.

## Tech Stack

- **Next.js 16** (App Router, RSC)
- **React 19**
- **Tailwind CSS 4** with CSS variables
- **TypeScript** (strict mode)
- **shadcn/ui** (Radix primitives)
- **@next/mdx** + rehype-pretty-code (shiki); plugin pipeline shared via `src/lib/mdx-plugins.mjs`
- **Geist** font family (Sans for body, Mono for terminal-flavored accents)
- **Node 22.x** required
- Light and dark themes, defaulting to the visitor's OS setting (`next-themes`,
  `defaultTheme="system"`). Light tokens live in `:root` and dark ones in
  `.dark` in `globals.css`; `<html>` carries `suppressHydrationWarning` because
  next-themes writes the class from a blocking script before first paint
- Builds use `--webpack`: Turbopack cannot serialize the MDX plugin options (function-valued rehype-pretty-code hooks)

## Commands

```bash
bun dev              # Start dev server (usually already running)
bun run build        # Production build
bun lint             # ESLint (flat config, typescript-eslint)
bunx shadcn@latest add <component>  # Add shadcn/ui components
```

No test suite. Verify changes with `bun lint` and `bun run build`.

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

### Theming

Both themes must work. Reach for the semantic tokens (`bg-background`,
`text-muted-foreground`, `border-border`, `text-primary`) rather than a palette
shade: a token is already correct in both themes, a `bg-slate-900` is not. When
a raw shade is genuinely the right call, pair it with a `dark:` variant.

- `dark` is a class variant, declared once as `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css`. `tailwind.config.ts` has no `darkMode` key on purpose; adding one would be a second source of truth
- Code blocks use two shiki themes (`github-light` / `github-dark`, set in `src/lib/mdx-plugins.mjs`). Tokens carry both palettes as `--shiki-light` / `--shiki-dark`, and `globals.css` picks between them. The block background stays `bg-muted`
- The theme toggle is `src/components/theme-toggle.tsx`, which drives the MagicUI `AnimatedThemeToggler` from `useTheme()`. It renders a same-sized placeholder until mounted, because the server cannot know the OS preference
- `src/styles/mdx.css` is dead: nothing imports it, and its `[data-rehype-pretty-code-fragment]` selectors predate rehype-pretty-code 0.14's `-figure`. Put MDX CSS in `globals.css`
- Next's CSS minifier crashes on an attribute selector whose value is a single space, so the documented `code[data-theme*=" "]` idiom is spelled `[data-theme~="github-light"]` instead

### Background

`src/components/gpu-grid/` renders topographic contours: a WebGPU shader
(`grid.wgsl`) over a traced SVG that shows until the shader is ready and stays
forever without WebGPU.

- Line colours and alphas are per-theme constants in `grid.wgsl`, selected by a `dark` uniform the component eases on toggle. `scripts/render-topo-fallback.mjs` mirrors those constants; change them together and re-run `bun run background:fallback`
- The alphas are flat across the frame. A radial mask used to brighten the top-right corner, which pulled the eye there
- There is one traced SVG per theme, applied as a CSS `background-image` via `.topo-fallback`. An SVG behind `url()` is isolated, so its baked-in stroke colours cannot be restyled from the page; as a background only the matching file is fetched, and the swap happens at first paint

### Typography Components

Use from `@/components/ui/typography` instead of raw HTML:

```typescript
import { H1, H2, P, Muted, Small } from "@/components/ui/typography";

<H2 className="animate-slide-enter">Title</H2>
<Muted>Secondary text</Muted>
```

### Animations

- `animate-slide-enter` - slide up + fade in (0.4s)
- Stagger with `stagger-<ms>` (e.g. `stagger-150`), a custom utility setting `animation-delay`. Tailwind's `delay-*` sets `transition-delay` and does NOT delay animations
- `animate-fade-in` - simple fade
- `hover-rise` - translateY on hover (custom Tailwind plugin)
- `prefers-reduced-motion` is handled globally in `globals.css`; never add motion that bypasses it

### Environment Variables

Add new env vars to `src/env.mjs` with Zod validation. Access via `import { env } from "@/env.mjs"`.

Current env vars:
- `GITHUB_TOKEN` - GitHub API access (optional; repos, pinned repos, contribution calendar)
- `GITHUB_USERNAME` - GitHub username (default: magnusrodseth)
- `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` / `SPOTIFY_REFRESH_TOKEN` - Spotify API (optional)

### OG Images

Use `opengraph-image.tsx` files in route directories with `@vercel/og`:

```typescript
import { ImageResponse } from "@vercel/og";

export default async function Image() {
  return new ImageResponse(/* JSX */);
}
```

### MDX Content

Blog posts live in `src/content/blog/*.mdx`. Frontmatter: `title`,
`description`, `lang`, `date`, and optionally `source` + `sourceUrl` for a post
that first ran elsewhere (`capra` or `kode24`, keyed in `POST_SOURCES` in
`src/lib/blog.ts`). The pair drives `<OriginalSource>` above the article and the
`isBasedOn` field in the BlogPosting JSON-LD; never hand-write the "originally
published at" sentence in an MDX file.

- Processed with remark-gfm, `remarkFigures`, rehype-slug,
  rehype-autolink-headings, rehype-pretty-code
- Code highlighting via shiki, dual theme (`github-light` / `github-dark`)

**Keep post bodies plain Markdown.** `/md/blog/<slug>.md` serves the body
verbatim to agents, so JSX in a post becomes noise there. The two things that
would otherwise need JSX are handled by `src/lib/remark-figures.mjs` instead:

- An `![alt](src)` followed by a `_caption_` line (same paragraph or the next
  one) becomes a real `<figure>` / `<figcaption>`
- Every image is stamped with its intrinsic size, read from `public/` at build
  time with `image-size`, so `next/image` reserves the right box

`mdx-components.tsx` maps `img` onto `ZoomableImage` (click to open full
screen, Escape or backdrop to close, focus returns to the thumbnail). Its
`figure` mapping must keep skipping code blocks: rehype-pretty-code wraps every
snippet in its own `<figure data-rehype-pretty-code-figure>`.

Code blocks: `pre` owns the frame (`bg-muted`, border, vertical padding) and
`code` is a grid whose `[data-line]` rows carry the horizontal padding, so a
highlighted line spans the full width. `code` renders the inline pill only when
`data-language` is absent; mapping `pre` onto the inline `InlineCode` (as it was
until 28.08.2026) nested `<code>` inside `<code>` and drew a second background
inside every block.

## Agent-facing surface

The site serves a machine-readable twin of itself. Everything below is derived
from `src/config/pages.ts` and `src/lib/blog.ts`; add a page there and it
propagates.

| Path | What |
|------|------|
| `/llms.txt`, `/llms-full.txt` | Index and full-text, llmstxt.org |
| `/md/**.md` | Prebuilt Markdown twin of every page |
| `/openapi.json` | OpenAPI 3.1 description of every endpoint |
| `/.well-known/api-catalog` | RFC 9727 linkset |
| `/.well-known/agent-skills/index.json` | Agent skills discovery index |
| `/sitemap.xml`, `/feed.xml`, `/atom.xml`, `/rss.xml` | Crawler feeds |

**The Markdown twins are static files, and that is load-bearing.** Next
replaces `Vary` on every App Router response with its own
`rsc, next-router-state-tree, ...`, discarding whatever `headers()` in
`next.config.mjs` set. Content negotiation needs `Vary: Accept` or a CDN can
serve the HTML variant to an agent asking for Markdown. A response served from
`public/` never reaches that code, so `scripts/generate-agent-markdown.ts`
writes `public/md/**.md` before `next build` (it is the first half of
`bun run build`; `bun run md:generate` runs it alone) and `src/proxy.ts`
rewrites `Accept: text/markdown` requests to those files. The `Link` header
from the same `headers()` block survives on every route, so only `Vary` needs
this treatment.

The script also emits `src/lib/markdown-routes.generated.ts`, the slug list the
proxy needs; the proxy runs on the Edge runtime and cannot read the filesystem.
Both outputs are committed so a checkout is servable without a build first;
never hand-edit either, the next build overwrites them. Anything the proxy cannot resolve to a static file
falls through to the `/md/[[...path]]` route handler, which answers 404 with a
Markdown body listing `/llms.txt`, the blog index, `/sitemap.xml` and
`/openapi.json`. `src/app/not-found.tsx` shows the same list to humans.

API failures use one JSON shape (`src/lib/api-error.ts`): a stable `error.code`
to branch on, plus `message`, `status`, `resolution` and `documentation`.
`src/app/api/[...unmatched]/route.ts` catches unknown `/api/*` paths so they
return that shape instead of the HTML 404 page.

## Key Libraries

| Library | Purpose |
|---------|---------|
| `octokit` | GitHub REST + GraphQL API (repos + contribution calendar, server-side) |
| `embla-carousel-react` | Carousels |
| `lucide-react` | Icons |
| `next-themes` | Light/dark theme with a system default |

The GitHub contribution calendar is rendered server-side (`src/components/github-calendar.tsx` + `getContributionCalendar` in `src/lib/github.ts`); the navbar logo's typing effect is pure CSS (`.logo-type` in `globals.css`). Do not reintroduce client-side libraries for these: the old `react-github-calendar` caused production hydration errors (React #418) because its SSR output depends on render-time dates.

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
