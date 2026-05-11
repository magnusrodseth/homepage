import { createHash } from "crypto";
import { siteConfig } from "@/config/site";
import { getBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

type Skill = {
  name: string;
  type: string;
  description: string;
  url: string;
  sha256: string;
};

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export function GET(): Response {
  const baseUrl = siteConfig.url;
  const posts = getBlogPosts();

  const skills: Skill[] = [
    {
      name: "site-content-index",
      type: "content-feed",
      description:
        "XML sitemap listing every public page on the site for crawlers and agents.",
      url: `${baseUrl}/sitemap.xml`,
      sha256: sha256(`${baseUrl}/sitemap.xml`),
    },
    ...posts.map<Skill>((post) => ({
      name: `blog-post:${post.slug}`,
      type: "content",
      description: post.description ?? post.title,
      url: `${baseUrl}/blog/${post.slug}`,
      sha256: sha256(`${baseUrl}/blog/${post.slug}`),
    })),
  ];

  const body = {
    $schema:
      "https://raw.githubusercontent.com/cloudflare/agent-skills-discovery-rfc/main/schemas/v0.2.0/index.schema.json",
    version: "0.2.0",
    site: {
      name: siteConfig.name,
      url: baseUrl,
      description: siteConfig.description,
    },
    skills,
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
