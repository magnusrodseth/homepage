import type { Heading } from "@/types";
import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();

function slugify(text: string): string {
  slugger.reset();
  return slugger.slug(text);
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = slugify(text);

    headings.push({ depth, text, slug });
  }

  return headings;
}
