import { buildRssFeed } from "@/lib/feed";

export const dynamic = "force-static";

// Alias of /feed.xml for readers that probe the conventional /rss.xml path.
export function GET(): Response {
  return new Response(buildRssFeed(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
