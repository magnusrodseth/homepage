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
