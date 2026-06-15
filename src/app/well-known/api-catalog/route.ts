import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function GET(): Response {
  const baseUrl = siteConfig.url;

  const linkset = {
    linkset: [
      {
        anchor: `${baseUrl}/`,
        "service-doc": [
          {
            href: `${baseUrl}/sitemap.xml`,
            type: "application/xml",
            title: "Site content index (sitemap)",
          },
          {
            href: `${baseUrl}/llms.txt`,
            type: "text/plain",
            title: "LLM-friendly site index (llms.txt)",
          },
          {
            href: `${baseUrl}/llms-full.txt`,
            type: "text/plain",
            title: "Full site content for LLMs (llms-full.txt)",
          },
        ],
        describedby: [
          {
            href: `${baseUrl}/.well-known/agent-skills/index.json`,
            type: "application/json",
            title: "Agent skills index",
          },
        ],
        alternate: [
          {
            href: `${baseUrl}/`,
            type: "text/markdown",
            title: "Markdown representation (via Accept: text/markdown)",
          },
          {
            href: `${baseUrl}/feed.xml`,
            type: "application/rss+xml",
            title: "Blog RSS feed",
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(linkset, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
