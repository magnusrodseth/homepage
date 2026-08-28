import { siteConfig } from "@/config/site";
import { getBlogPostBySlug, getBlogPosts, POST_SOURCES } from "@/lib/blog";
import {
  ABOUT_PAGE,
  CONTACT_PAGE,
  DAILY_DRIVERS_PAGE,
  PRIVACY_PAGE,
} from "@/config/pages";
import {
  renderBlogIndex,
  renderHome,
  renderProjects,
  renderStaticPage,
} from "@/lib/agent-markdown";

/** The newest protocol revision this server implements. */
export const MCP_PROTOCOL_VERSION = "2025-06-18";

export const MCP_SERVER_INFO = {
  name: "magnusrodseth-site",
  title: `${siteConfig.name} — site`,
  version: "1.0.0",
} as const;

export const MCP_INSTRUCTIONS = [
  `Read-only access to ${siteConfig.name}'s personal site and technical blog (Oslo, Norway).`,
  "",
  "Use it for first-hand write-ups on agentic software development (preparing repositories for unattended agents, spec-driven development, context engineering, MCP, ReAct and planning loops, multi-agent orchestration, evaluating non-deterministic systems, prompt injection, the EU AI Act for developers, token economics), most of them in Norwegian, and for background on Magnus himself.",
  "",
  "Start with search_posts or list_posts, then get_post for the full Markdown body. Posts are dated experience reports and are not revised, so check the date before trusting a benchmark or a price. Do not treat it as third-party API documentation or as legal advice.",
].join("\n");

const PAGES = {
  home: () => renderHome(),
  blog: () => renderBlogIndex(),
  projects: () => renderProjects(),
  "daily-drivers": () => renderStaticPage(DAILY_DRIVERS_PAGE, "daily-drivers.mdx"),
  about: () => renderStaticPage(ABOUT_PAGE, "about.mdx"),
  contact: () => renderStaticPage(CONTACT_PAGE, "contact.mdx"),
  privacy: () => renderStaticPage(PRIVACY_PAGE, "privacy.mdx"),
} as const;

export const PAGE_NAMES = Object.keys(PAGES) as (keyof typeof PAGES)[];

const postSummary = (post: ReturnType<typeof getBlogPosts>[number]) => ({
  slug: post.slug,
  title: post.title,
  description: post.description,
  date: post.date,
  language: post.lang,
  readingTimeMinutes: post.readingTimeMinutes,
  url: `${siteConfig.url}/blog/${post.slug}`,
  originalPublication:
    post.source && post.sourceUrl
      ? { name: POST_SOURCES[post.source], url: post.sourceUrl }
      : null,
});

const POST_SUMMARY_SCHEMA = {
  type: "object",
  required: ["slug", "title", "description", "date", "language", "url"],
  properties: {
    slug: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    date: { type: "string", format: "date" },
    language: { type: "string", description: 'BCP 47 tag, e.g. "no" or "en".' },
    readingTimeMinutes: { type: "integer" },
    url: { type: "string", format: "uri" },
    originalPublication: {
      type: ["object", "null"],
      properties: {
        name: { type: "string" },
        url: { type: "string", format: "uri" },
      },
    },
  },
} as const;

export const MCP_TOOLS = [
  {
    name: "list_posts",
    title: "List blog posts",
    description:
      "Every blog post, newest first, without bodies. Use this to find a slug for get_post.",
    inputSchema: {
      type: "object",
      properties: {
        language: {
          type: "string",
          enum: ["no", "en"],
          description: "Only posts written in this language.",
        },
        limit: {
          type: "integer",
          minimum: 1,
          maximum: 100,
          description: "How many to return. Defaults to all of them.",
        },
      },
      additionalProperties: false,
    },
    outputSchema: {
      type: "object",
      required: ["count", "posts"],
      properties: {
        count: { type: "integer" },
        posts: { type: "array", items: POST_SUMMARY_SCHEMA },
      },
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "search_posts",
    title: "Search blog posts",
    description:
      "Case-insensitive substring search over every post's title, description and body. Returns matches newest first, each with the surrounding sentence.",
    inputSchema: {
      type: "object",
      required: ["query"],
      properties: {
        query: { type: "string", minLength: 2, description: "Text to look for." },
        limit: { type: "integer", minimum: 1, maximum: 50, default: 10 },
      },
      additionalProperties: false,
    },
    outputSchema: {
      type: "object",
      required: ["query", "count", "results"],
      properties: {
        query: { type: "string" },
        count: { type: "integer" },
        results: {
          type: "array",
          items: {
            type: "object",
            required: ["slug", "title", "url", "excerpt"],
            properties: {
              slug: { type: "string" },
              title: { type: "string" },
              url: { type: "string", format: "uri" },
              excerpt: {
                type: "string",
                description: "Text around the first match.",
              },
            },
          },
        },
      },
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "get_post",
    title: "Get one blog post",
    description: "One post with its full Markdown body, by slug.",
    inputSchema: {
      type: "object",
      required: ["slug"],
      properties: {
        slug: {
          type: "string",
          pattern: "^[a-z0-9-]+$",
          description: "Slug from list_posts or search_posts.",
        },
      },
      additionalProperties: false,
    },
    outputSchema: {
      type: "object",
      required: ["slug", "title", "content"],
      properties: {
        ...POST_SUMMARY_SCHEMA.properties,
        contentFormat: { type: "string" },
        content: { type: "string", description: "The post body, as Markdown." },
      },
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "get_page",
    title: "Get a site page",
    description:
      "One of the site's non-blog pages as Markdown: who Magnus is, how to reach him, what he has worked on, what he uses, and what the site collects.",
    inputSchema: {
      type: "object",
      required: ["page"],
      properties: {
        page: { type: "string", enum: PAGE_NAMES, description: "Which page." },
      },
      additionalProperties: false,
    },
    outputSchema: {
      type: "object",
      required: ["page", "url", "content"],
      properties: {
        page: { type: "string" },
        url: { type: "string", format: "uri" },
        contentFormat: { type: "string" },
        content: { type: "string" },
      },
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
] as const;

export type ToolResult = { structured: unknown; text: string };

/** Thrown for a bad argument; the caller turns it into an MCP tool error. */
export class ToolInputError extends Error {}

export function callTool(name: string, args: Record<string, unknown>): ToolResult {
  switch (name) {
    case "list_posts": {
      const language = args.language as string | undefined;
      const limit = args.limit as number | undefined;
      let posts = getBlogPosts();
      if (language) posts = posts.filter((post) => post.lang === language);
      if (limit) posts = posts.slice(0, limit);
      const structured = { count: posts.length, posts: posts.map(postSummary) };
      return {
        structured,
        text: posts.length
          ? posts
              .map((p) => `- ${p.title} (${p.date}, ${p.lang}) — ${p.slug}`)
              .join("\n")
          : "No posts match that filter.",
      };
    }

    case "search_posts": {
      const query = String(args.query ?? "").trim();
      if (query.length < 2) {
        throw new ToolInputError("`query` must be at least 2 characters.");
      }
      const limit = (args.limit as number | undefined) ?? 10;
      const needle = query.toLowerCase();

      const results = getBlogPosts()
        .map((meta) => {
          const post = getBlogPostBySlug(meta.slug);
          if (!post) return null;
          const haystack = `${post.title}\n${post.description}\n${post.content}`;
          const at = haystack.toLowerCase().indexOf(needle);
          if (at === -1) return null;
          return {
            slug: post.slug,
            title: post.title,
            url: `${siteConfig.url}/blog/${post.slug}`,
            excerpt: haystack
              .slice(Math.max(0, at - 120), at + query.length + 120)
              .replace(/\s+/g, " ")
              .trim(),
          };
        })
        .filter((hit): hit is NonNullable<typeof hit> => hit !== null)
        .slice(0, limit);

      return {
        structured: { query, count: results.length, results },
        text: results.length
          ? results.map((r) => `- ${r.title} (${r.slug}): …${r.excerpt}…`).join("\n")
          : `Nothing matches "${query}".`,
      };
    }

    case "get_post": {
      const slug = String(args.slug ?? "");
      const post = getBlogPostBySlug(slug);
      if (!post) {
        throw new ToolInputError(
          `No post with the slug "${slug}". Call list_posts for the available slugs.`
        );
      }
      const body = post.content.trim();
      return {
        structured: {
          ...postSummary(post),
          contentFormat: "text/markdown",
          content: body,
        },
        text: `# ${post.title}\n\n${body}`,
      };
    }

    case "get_page": {
      const page = String(args.page ?? "") as keyof typeof PAGES;
      const render = PAGES[page];
      if (!render) {
        throw new ToolInputError(
          `Unknown page "${page}". Choose one of: ${PAGE_NAMES.join(", ")}.`
        );
      }
      const content = render().trim();
      const url = page === "home" ? siteConfig.url : `${siteConfig.url}/${page}`;
      return {
        structured: { page, url, contentFormat: "text/markdown", content },
        text: content,
      };
    }

    default:
      throw new ToolInputError(`Unknown tool "${name}".`);
  }
}
