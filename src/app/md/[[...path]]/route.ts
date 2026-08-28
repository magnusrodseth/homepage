import { siteConfig } from "@/config/site";
import { getBlogSlugs } from "@/lib/blog";
import {
  renderHome,
  renderBlogIndex,
  renderBlogPost,
  renderProjects,
  renderDailyDrivers,
} from "@/lib/agent-markdown";

export const dynamic = "force-static";

type Params = { params: Promise<{ path?: string[] }> };

/**
 * The 404 an agent gets. It carries the same recovery map as the HTML 404
 * page, so a failed guess at a URL costs one request instead of a dead end.
 */
function notFoundMarkdown(pathname: string): string {
  const base = siteConfig.url;
  return [
    "# 404 Not found",
    "",
    `No page exists at \`${pathname}\` on ${base}.`,
    "",
    "## Where to look next",
    "",
    `- [llms.txt](${base}/llms.txt): index of every page and post`,
    `- [Blog index](${base}/md/blog.md): all writing, as Markdown`,
    `- [sitemap.xml](${base}/sitemap.xml): every public URL`,
    `- [openapi.json](${base}/openapi.json): machine-readable API surface`,
    `- [Home](${base}/md/index.md)`,
    "",
    "Every page answers `Accept: text/markdown` with a Markdown version of itself.",
    "",
  ].join("\n");
}

function markdownResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Markdown-Tokens": String(body.split(/\s+/).filter(Boolean).length),
      "Cache-Control": "public, max-age=300",
      Vary: "Accept",
    },
  });
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return [
    { path: [] },
    { path: ["blog"] },
    { path: ["projects"] },
    { path: ["daily-drivers"] },
    ...slugs.map((slug) => ({ path: ["blog", slug] })),
  ];
}

export async function GET(_req: Request, { params }: Params): Promise<Response> {
  const { path: segments = [] } = await params;
  const joined = segments.join("/");

  if (segments.length === 0) {
    return markdownResponse(renderHome());
  }

  if (joined === "blog") {
    return markdownResponse(renderBlogIndex());
  }

  if (segments[0] === "blog" && segments.length === 2) {
    const md = renderBlogPost(segments[1]);
    if (md) return markdownResponse(md);
    return markdownResponse(notFoundMarkdown(`/${joined}`), 404);
  }

  if (joined === "projects") {
    return markdownResponse(renderProjects());
  }

  if (joined === "daily-drivers") {
    return markdownResponse(renderDailyDrivers());
  }

  return markdownResponse(notFoundMarkdown(`/${joined}`), 404);
}
