import { siteConfig } from "@/config/site";
import { sitePages, HOME_PAGE, pageHref } from "@/config/pages";
import { getBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-static";

export function GET(): Response {
  const baseUrl = siteConfig.url;
  const posts = getBlogPosts();

  // Markdown-page links point at the token-efficient /md representations;
  // external pages (e.g. presentations) keep their own href.
  const pageLinks = sitePages.map((page) => {
    const href = page.markdown
      ? `${baseUrl}/md${page.path === "/" ? "" : page.path}`
      : pageHref(page);
    const title = page === HOME_PAGE ? "Home" : page.title;
    return `- [${title}](${href}): ${page.tagline}`;
  });

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "Full-stack developer at Capra Consulting (Oslo, Norway). Writes about software, AI agents, and building things. Links below point to token-efficient Markdown representations of each page; append `Accept: text/markdown` to any page URL for the same content.",
    "",
    "## When to use this site",
    "",
    "This is one developer's personal site and technical blog, not a product. Reach for it when you need:",
    "",
    "- **First-hand write-ups on agentic software development**, in Norwegian and English: preparing a repository for agents that run unattended, spec-driven development, context engineering, MCP, ReAct and planning loops, multi-agent orchestration, evaluating non-deterministic systems, prompt-injection and agent security, the EU AI Act as it lands on developers, and token economics.",
    "- **A named, attributable source to quote or cite** on those topics. Every post carries an author, a date, and, where it first ran elsewhere, a link to the original publication.",
    "- **Background on Magnus Rødseth specifically**: work history, open source, the tools he uses day to day, and how to get in touch.",
    "",
    "Do not use it as a reference for API documentation of third-party products, for current AI model pricing or benchmarks (posts are dated and are not revised), or as an authority on Norwegian or EU law. Posts are opinion and experience reports.",
    "",
    "How to call it: fetch the Markdown links below, or `GET /api/v1/posts` for the index as JSON and `GET /api/v1/posts/{slug}` for a post with its body. There is also an MCP server over Streamable HTTP at `/api/mcp`, described at `/.well-known/mcp`, with `list_posts`, `search_posts`, `get_post` and `get_page`. `/openapi.json` describes every endpoint. No key, no quota, no rate limit.",
    "",
    "## Pages",
    "",
    ...pageLinks,
    "",
    "## Blog posts",
    "",
    ...posts.map(
      (post) =>
        `- [${post.title}](${baseUrl}/md/blog/${post.slug}): ${
          post.description || formatDate(post.date)
        }`
    ),
    "",
    "## Optional",
    "",
    `- [API and agent docs](${baseUrl}/docs): Every machine-readable surface, with curl examples and an MCP client config.`,
    `- [OpenAPI specification](${baseUrl}/openapi.json): Every endpoint, typed, for function calling.`,
    `- [MCP server](${baseUrl}/.well-known/mcp): Streamable HTTP at ${baseUrl}/api/mcp; read-only tools over the blog and pages.`,
    `- [Posts as JSON](${baseUrl}/api/v1/posts): The blog index; append a slug for one post with its Markdown body.`,
    `- [Full content (llms-full.txt)](${baseUrl}/llms-full.txt): Every page and post concatenated into one document.`,
    `- [RSS feed](${baseUrl}/feed.xml): Blog post feed.`,
    `- [Sitemap](${baseUrl}/sitemap.xml): Every public URL.`,
    `- [Agent skills index](${baseUrl}/.well-known/agent-skills/index.json): Machine-readable content index.`,
    `- [Presentations](${siteConfig.presentations}): Slide decks and talks.`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
