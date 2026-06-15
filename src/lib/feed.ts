import { siteConfig } from "@/config/site";
import { BLOG_PAGE } from "@/config/pages";
import { getBlogPosts } from "@/lib/blog";

const FEED_DESCRIPTION = BLOG_PAGE.tagline;

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildRssFeed(): string {
  const baseUrl = siteConfig.url;
  const posts = getBlogPosts();
  const lastBuildDate = (
    posts.length ? new Date(posts[0].date) : new Date()
  ).toUTCString();

  const items = posts
    .map((post) => {
      const url = `${baseUrl}/blog/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        post.description
          ? `      <description>${escapeXml(post.description)}</description>`
          : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(siteConfig.name)}</title>`,
    `    <link>${baseUrl}/blog</link>`,
    `    <description>${FEED_DESCRIPTION}</description>`,
    "    <language>en</language>",
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

export function buildAtomFeed(): string {
  const baseUrl = siteConfig.url;
  const posts = getBlogPosts();
  const updated = (
    posts.length ? new Date(posts[0].date) : new Date()
  ).toISOString();

  const entries = posts
    .map((post) => {
      const url = `${baseUrl}/blog/${post.slug}`;
      return [
        "  <entry>",
        `    <title>${escapeXml(post.title)}</title>`,
        `    <link href="${url}" />`,
        `    <id>${url}</id>`,
        `    <updated>${new Date(post.date).toISOString()}</updated>`,
        post.description
          ? `    <summary>${escapeXml(post.description)}</summary>`
          : "",
        "  </entry>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <title>${escapeXml(siteConfig.name)}</title>`,
    `  <subtitle>${FEED_DESCRIPTION}</subtitle>`,
    `  <link href="${baseUrl}/atom.xml" rel="self" />`,
    `  <link href="${baseUrl}/blog" />`,
    `  <id>${baseUrl}/</id>`,
    `  <updated>${updated}</updated>`,
    `  <author><name>${escapeXml(siteConfig.name)}</name></author>`,
    entries,
    "</feed>",
    "",
  ].join("\n");
}
