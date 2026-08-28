import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { readingTimeInMinutes } from "@/lib/readingTime";

/**
 * Publications that first ran a post. Posts written for this site have no
 * `source` at all; the key is what the `source` frontmatter field names.
 */
export const POST_SOURCES = {
  capra: "Capra Consulting",
  kode24: "Kode24",
} as const;

export type PostSource = keyof typeof POST_SOURCES;

export function isPostSource(value: unknown): value is PostSource {
  return typeof value === "string" && value in POST_SOURCES;
}

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  /** BCP 47 language tag for the post body, e.g. "no" or "en". */
  lang: string;
  readingTimeMinutes: number;
  /** Publication this post first appeared in, when it is a republication. */
  source?: PostSource;
  /** Canonical URL at that publication. */
  sourceUrl?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const DEFAULT_POST_LANG = "en";

export function getBlogSlugs(): string[] {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  // A source is only meaningful with a URL to point at, and vice versa.
  const hasSource = isPostSource(data.source) && Boolean(data.sourceUrl);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    lang: data.lang ?? DEFAULT_POST_LANG,
    readingTimeMinutes: readingTimeInMinutes(content),
    ...(hasSource
      ? { source: data.source as PostSource, sourceUrl: String(data.sourceUrl) }
      : {}),
    content,
  };
}

export function getBlogPosts(): BlogPostMeta[] {
  const slugs = getBlogSlugs();

  return slugs
    .map((slug) => {
      const post = getBlogPostBySlug(slug);
      if (!post) return null;

      const { content, ...meta } = post;
      void content;
      return meta;
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
