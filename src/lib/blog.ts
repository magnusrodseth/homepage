import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { readingTimeInMinutes } from "@/lib/readingTime";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  /** BCP 47 language tag for the post body, e.g. "no" or "en". */
  lang: string;
  readingTimeMinutes: number;
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

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    lang: data.lang ?? DEFAULT_POST_LANG,
    readingTimeMinutes: readingTimeInMinutes(content),
    content,
  };
}

export function getBlogPosts(): BlogPostMeta[] {
  const slugs = getBlogSlugs();

  return slugs
    .map((slug) => {
      const post = getBlogPostBySlug(slug);
      if (!post) return null;

      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        lang: post.lang,
        readingTimeMinutes: post.readingTimeMinutes,
      };
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
