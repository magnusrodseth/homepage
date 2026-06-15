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

function notFoundMarkdown(pathname: string): string {
  return [
    "# Not found",
    "",
    `No markdown representation is available for \`${pathname}\`.`,
    "",
    `Visit [${siteConfig.url}](${siteConfig.url}) for the site map.`,
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
