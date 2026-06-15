import fs from "fs";
import path from "path";
import { siteConfig } from "@/config/site";
import {
  BLOG_PAGE,
  PROJECTS_PAGE,
  DAILY_DRIVERS_PAGE,
  HOME_PAGE,
  pageHref,
  sitePages,
} from "@/config/pages";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { getAllExperiences } from "@/lib/data/experience";
import { formatDate } from "@/lib/utils";

const PAGES_DIR = path.join(process.cwd(), "src/content/pages");

function readPageBody(filename: string, fallback: string): string {
  try {
    return fs.readFileSync(path.join(PAGES_DIR, filename), "utf-8").trim();
  } catch {
    return fallback;
  }
}

function renderHeading(title: string, tagline: string): string {
  return [`# ${title}`, "", tagline, ""].join("\n");
}

export function renderHome(): string {
  const body = readPageBody("index.mdx", siteConfig.description);
  const siteMap = sitePages
    .filter((page) => page !== HOME_PAGE)
    .map((page) => `- [${page.title}](${pageHref(page)})`);

  return [
    `# ${HOME_PAGE.title}`,
    "",
    HOME_PAGE.tagline,
    "",
    body,
    "",
    "## Site map",
    "",
    ...siteMap,
    "",
    "## Contact",
    "",
    `- GitHub: ${siteConfig.github}`,
    `- LinkedIn: ${siteConfig.linkedIn}`,
    `- Email: ${siteConfig.email.replace(/^mailto:/, "")}`,
    "",
  ].join("\n");
}

export function renderBlogIndex(): string {
  const posts = getBlogPosts();
  const lines = [renderHeading(BLOG_PAGE.title, BLOG_PAGE.tagline)];
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

export function renderBlogPost(slug: string): string | null {
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

export function renderProjects(): string {
  const experiences = getAllExperiences().filter(
    (exp) =>
      exp.type === "professional" ||
      exp.type === "freelance" ||
      exp.type === "internship"
  );

  const lines = [
    renderHeading(PROJECTS_PAGE.title, PROJECTS_PAGE.tagline),
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

export function renderDailyDrivers(): string {
  const body = readPageBody("daily-drivers.mdx", DAILY_DRIVERS_PAGE.tagline);
  return [
    renderHeading(DAILY_DRIVERS_PAGE.title, DAILY_DRIVERS_PAGE.tagline),
    body,
    "",
  ].join("\n");
}
