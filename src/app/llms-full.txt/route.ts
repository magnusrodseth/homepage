import { getBlogPosts } from "@/lib/blog";
import {
  renderHome,
  renderProjects,
  renderDailyDrivers,
  renderBlogPost,
} from "@/lib/agent-markdown";

export const dynamic = "force-static";

export function GET(): Response {
  const posts = getBlogPosts();

  const sections = [
    renderHome(),
    renderProjects(),
    renderDailyDrivers(),
    ...posts
      .map((post) => renderBlogPost(post.slug))
      .filter((section): section is string => Boolean(section)),
  ];

  const body = sections.join("\n\n---\n\n") + "\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Markdown-Tokens": String(body.split(/\s+/).filter(Boolean).length),
      "Cache-Control": "public, max-age=3600",
    },
  });
}
