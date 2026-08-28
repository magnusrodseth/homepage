import { NextResponse } from "next/server";
import { getBlogPosts, POST_SOURCES } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

/**
 * The blog index as JSON: the same content the HTML and Markdown views show,
 * in the shape an agent can iterate without parsing a document.
 */
export function GET(): Response {
  const posts = getBlogPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    language: post.lang,
    readingTimeMinutes: post.readingTimeMinutes,
    url: `${siteConfig.url}/blog/${post.slug}`,
    markdownUrl: `${siteConfig.url}/md/blog/${post.slug}.md`,
    jsonUrl: `${siteConfig.url}/api/v1/posts/${post.slug}`,
    originalPublication:
      post.source && post.sourceUrl
        ? { name: POST_SOURCES[post.source], url: post.sourceUrl }
        : null,
  }));

  return NextResponse.json(
    { count: posts.length, posts },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    }
  );
}
