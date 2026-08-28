import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sitePages } from "@/config/pages";
import { MARKDOWN_BLOG_SLUGS } from "@/lib/markdown-routes.generated";

// Derived from the page registry: every page that exposes a Markdown view.
const MARKDOWN_PATHS = new Set(
  sitePages.filter((page) => page.markdown).map((page) => page.path)
);

function isMarkdownAcceptHeader(accept: string | null): boolean {
  if (!accept) return false;
  return accept
    .split(",")
    .some((part) => part.trim().toLowerCase().startsWith("text/markdown"));
}

/**
 * Where to serve the Markdown representation of `pathname` from.
 *
 * Prebuilt pages resolve to a static file under `public/md/`, which is the
 * only place the `Vary: Accept` header survives: Next replaces `Vary` on every
 * App Router response with its own RSC value. Anything else falls through to
 * the /md route handler, which answers with a Markdown 404 body.
 */
function markdownTarget(pathname: string): string {
  if (MARKDOWN_PATHS.has(pathname)) {
    return pathname === "/" ? "/md/index.md" : `/md${pathname}.md`;
  }

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch && MARKDOWN_BLOG_SLUGS.has(blogMatch[1])) {
    return `/md${pathname}.md`;
  }

  return `/md${pathname}`;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!isMarkdownAcceptHeader(req.headers.get("accept"))) {
    return NextResponse.next();
  }

  const target = req.nextUrl.clone();
  target.pathname = markdownTarget(pathname);

  const res = NextResponse.rewrite(target);
  res.headers.set("Vary", "Accept, Accept-Encoding");
  return res;
}

/**
 * Every path that is not already a file or an internal Next route. The
 * catch-all is deliberate: an agent asking for `text/markdown` on a URL that
 * does not exist should get a Markdown 404 telling it where to look, not the
 * HTML error page.
 */
export const config = {
  matcher: ["/((?!_next/|api/|md/|favicon|.*\\.[a-z0-9]+$).*)"],
};
