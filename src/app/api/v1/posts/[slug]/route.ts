import { NextResponse } from "next/server";
import { getBlogPostBySlug, getBlogSlugs, POST_SOURCES } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { apiError } from "@/lib/api-error";

export const dynamic = "force-static";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

/** One post, body included. `content` is the post's Markdown source. */
export async function GET(_req: Request, { params }: Params): Promise<Response> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return apiError(
      "not_found",
      `No post with the slug "${slug}".`,
      `List every slug at ${siteConfig.url}/api/v1/posts.`
    );
  }

  return NextResponse.json(
    {
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      language: post.lang,
      readingTimeMinutes: post.readingTimeMinutes,
      url: `${siteConfig.url}/blog/${post.slug}`,
      markdownUrl: `${siteConfig.url}/md/blog/${post.slug}.md`,
      originalPublication:
        post.source && post.sourceUrl
          ? { name: POST_SOURCES[post.source], url: post.sourceUrl }
          : null,
      contentFormat: "text/markdown",
      content: post.content.trim(),
    },
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    }
  );
}
