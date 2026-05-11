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
