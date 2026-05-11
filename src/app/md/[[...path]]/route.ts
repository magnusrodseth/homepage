import fs from "fs";
import path from "path";
import { siteConfig } from "@/config/site";
import { getBlogPostBySlug, getBlogPosts, getBlogSlugs } from "@/lib/blog";
import { getAllExperiences } from "@/lib/data/experience";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-static";

type Params = { params: Promise<{ path?: string[] }> };

const HOMEPAGE_INDEX_MDX = path.join(
  process.cwd(),
  "src/content/pages/index.mdx"
);

function readHomepageBody(): string {
  try {
    return fs.readFileSync(HOMEPAGE_INDEX_MDX, "utf-8").trim();
  } catch {
    return siteConfig.description;
  }
}

function renderHome(): string {
  const body = readHomepageBody();
  return [
    `# ${siteConfig.name}`,
    "",
    siteConfig.description,
    "",
    body,
    "",
    "## Site map",
    "",
    `- [Blog](${siteConfig.url}/blog)`,
    `- [Projects](${siteConfig.url}/projects)`,
    `- [Presentations](${siteConfig.presentations})`,
    "",
    "## Contact",
    "",
    `- GitHub: ${siteConfig.github}`,
    `- LinkedIn: ${siteConfig.linkedIn}`,
    `- Email: ${siteConfig.email.replace(/^mailto:/, "")}`,
    "",
  ].join("\n");
}

function renderBlogIndex(): string {
  const posts = getBlogPosts();
  const lines = [
    "# Blog",
    "",
    "Thoughts on software, AI, and building things.",
    "",
  ];
  for (const post of posts) {
    lines.push(
      `- [${post.title}](${siteConfig.url}/blog/${post.slug}) — ${formatDate(post.date)}`
    );
    if (post.description) {
      lines.push(`  ${post.description}`);
    }
  }
  lines.push("");
  return lines.join("\n");
}

function renderBlogPost(slug: string): string | null {
  const post = getBlogPostBySlug(slug);
  if (!post) return null;
  return [
    `# ${post.title}`,
    "",
    `Published: ${formatDate(post.date)}`,
    "",
    post.description ? `> ${post.description}` : "",
    "",
    post.content.trim(),
    "",
  ]
    .filter((line, idx, arr) => !(line === "" && arr[idx - 1] === ""))
    .join("\n");
}

function renderProjects(): string {
  const experiences = getAllExperiences().filter(
    (exp) =>
      exp.type === "professional" ||
      exp.type === "freelance" ||
      exp.type === "internship"
  );

  const lines = [
    "# Projects",
    "",
    "A collection of professional work and open source projects.",
    "",
    "## Professional experience",
    "",
  ];

  for (const exp of experiences) {
    const end = exp.endDate === "present" ? "present" : formatDate(exp.endDate);
    lines.push(`### ${exp.role} at ${exp.company}`);
    lines.push("");
    lines.push(`${formatDate(exp.startDate)} – ${end} · ${exp.location}`);
    lines.push("");
    lines.push(exp.description);
    if (exp.technologies?.length) {
      lines.push("");
      lines.push(`Tech: ${exp.technologies.join(", ")}`);
    }
    lines.push("");
  }

  lines.push(
    `Open source projects are listed at ${siteConfig.github} and on the [projects page](${siteConfig.url}/projects).`
  );
  lines.push("");
  return lines.join("\n");
}

function notFoundMarkdown(pathname: string): string {
  return [
    "# Not found",
    "",
    `No markdown representation is available for \`${pathname}\`.`,
    "",
    `Visit [${siteConfig.url}](${siteConfig.url}) for the site map.`,
    "",
  ].join("\n");
}

function markdownResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Markdown-Tokens": String(body.split(/\s+/).filter(Boolean).length),
      "Cache-Control": "public, max-age=300",
      Vary: "Accept",
    },
  });
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return [
    { path: [] },
    { path: ["blog"] },
    { path: ["projects"] },
    ...slugs.map((slug) => ({ path: ["blog", slug] })),
  ];
}

export async function GET(_req: Request, { params }: Params): Promise<Response> {
  const { path: segments = [] } = await params;
  const joined = segments.join("/");

  if (segments.length === 0) {
    return markdownResponse(renderHome());
  }

  if (joined === "blog") {
    return markdownResponse(renderBlogIndex());
  }

  if (segments[0] === "blog" && segments.length === 2) {
    const md = renderBlogPost(segments[1]);
    if (md) return markdownResponse(md);
    return markdownResponse(notFoundMarkdown(`/${joined}`), 404);
  }

  if (joined === "projects") {
    return markdownResponse(renderProjects());
  }

  return markdownResponse(notFoundMarkdown(`/${joined}`), 404);
}
