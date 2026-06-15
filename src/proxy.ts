import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sitePages } from "@/config/pages";

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

function isMarkdownRoutablePath(pathname: string): boolean {
  if (MARKDOWN_PATHS.has(pathname)) return true;
  return /^\/blog\/[^/]+$/.test(pathname);
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    !isMarkdownAcceptHeader(req.headers.get("accept")) ||
    !isMarkdownRoutablePath(pathname)
  ) {
    return NextResponse.next();
  }

  const target = req.nextUrl.clone();
  target.pathname = pathname === "/" ? "/md" : `/md${pathname}`;

  const res = NextResponse.rewrite(target);
  res.headers.set("Vary", "Accept");
  return res;
}

// Keep in sync with the `markdown` pages in src/config/pages.ts. Next requires
// this matcher to be statically analyzable, so it cannot be derived at build.
export const config = {
  matcher: ["/", "/blog", "/blog/:slug", "/projects", "/daily-drivers"],
};
