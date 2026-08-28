import { siteConfig } from "@/config/site";
import { API_ERROR_CODES } from "@/lib/api-error";

export const dynamic = "force-static";

const ERROR_RESPONSE = {
  description: "Structured error. `error.code` is stable; branch on it.",
  content: {
    "application/json": { schema: { $ref: "#/components/schemas/Error" } },
  },
};

const markdownResponse = (description: string) => ({
  description,
  content: { "text/markdown": { schema: { type: "string" } } },
});

/**
 * Machine-readable description of everything this site serves over HTTP, at
 * the conventional /openapi.json. It covers the JSON API and the
 * agent-oriented representations (Markdown, llms.txt, feeds, discovery
 * documents), because those are the endpoints an agent actually calls.
 */
export function GET(): Response {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: `${siteConfig.name} — site API`,
      version: "1.0.0",
      summary: "Machine-readable representations of a personal site and blog.",
      description: [
        "Read-only, unauthenticated, no rate limit.",
        "",
        "Every page also answers `Accept: text/markdown` with a Markdown twin of itself; the same content is reachable at the `/md/...` paths below. Start at `/llms.txt` for an index.",
      ].join("\n"),
      contact: {
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email.replace(/^mailto:/, ""),
      },
      license: {
        name: "All rights reserved",
        url: `${siteConfig.url}/`,
      },
    },
    servers: [{ url: siteConfig.url }],
    tags: [
      { name: "content", description: "Page and post content." },
      { name: "discovery", description: "Indexes, feeds, and well-known documents." },
      { name: "api", description: "JSON endpoints." },
    ],
    paths: {
      "/llms.txt": {
        get: {
          tags: ["discovery"],
          operationId: "getLlmsTxt",
          summary: "Site index for language models (llmstxt.org).",
          responses: {
            "200": {
              description: "Index of pages and posts with Markdown links.",
              content: { "text/plain": { schema: { type: "string" } } },
            },
          },
        },
      },
      "/llms-full.txt": {
        get: {
          tags: ["discovery"],
          operationId: "getLlmsFullTxt",
          summary: "Every page and post concatenated into one document.",
          responses: {
            "200": {
              description: "Full site content as plain text.",
              content: { "text/plain": { schema: { type: "string" } } },
            },
          },
        },
      },
      "/md/index.md": {
        get: {
          tags: ["content"],
          operationId: "getHomeMarkdown",
          summary: "Home page as Markdown.",
          responses: { "200": markdownResponse("Home page content.") },
        },
      },
      "/md/blog.md": {
        get: {
          tags: ["content"],
          operationId: "getBlogIndexMarkdown",
          summary: "Blog index as Markdown.",
          responses: { "200": markdownResponse("List of every post.") },
        },
      },
      "/md/blog/{slug}.md": {
        get: {
          tags: ["content"],
          operationId: "getBlogPostMarkdown",
          summary: "One blog post as Markdown.",
          description:
            "`GET /blog/{slug}` with `Accept: text/markdown` returns the same body.",
          parameters: [
            {
              name: "slug",
              in: "path",
              required: true,
              description: "Post slug, as listed in /llms.txt or /sitemap.xml.",
              schema: { type: "string", pattern: "^[a-z0-9-]+$" },
            },
          ],
          responses: {
            "200": markdownResponse("Post front matter and body."),
            "404": markdownResponse("No such post; body links to the site map."),
          },
        },
      },
      "/md/projects.md": {
        get: {
          tags: ["content"],
          operationId: "getProjectsMarkdown",
          summary: "Projects and work history as Markdown.",
          responses: { "200": markdownResponse("Projects page content.") },
        },
      },
      "/md/daily-drivers.md": {
        get: {
          tags: ["content"],
          operationId: "getDailyDriversMarkdown",
          summary: "Tools and hardware in daily use, as Markdown.",
          responses: { "200": markdownResponse("Daily drivers page content.") },
        },
      },
      "/api/spotify/recent": {
        get: {
          tags: ["api"],
          operationId: "getRecentSpotifyTracks",
          summary: "Recently played Spotify tracks.",
          description:
            "Decorative. Fails soft: the site is fully readable without it.",
          responses: {
            "200": {
              description: "Up to five recently played tracks, newest first.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/RecentTrack" },
                  },
                },
              },
            },
            "500": ERROR_RESPONSE,
            "503": ERROR_RESPONSE,
          },
        },
      },
      "/sitemap.xml": {
        get: {
          tags: ["discovery"],
          operationId: "getSitemap",
          summary: "Every public URL.",
          responses: {
            "200": {
              description: "urlset document.",
              content: { "application/xml": { schema: { type: "string" } } },
            },
          },
        },
      },
      "/feed.xml": {
        get: {
          tags: ["discovery"],
          operationId: "getRssFeed",
          summary: "Blog RSS feed. Also served at /rss.xml.",
          responses: {
            "200": {
              description: "RSS 2.0 document.",
              content: {
                "application/rss+xml": { schema: { type: "string" } },
              },
            },
          },
        },
      },
      "/atom.xml": {
        get: {
          tags: ["discovery"],
          operationId: "getAtomFeed",
          summary: "Blog Atom feed.",
          responses: {
            "200": {
              description: "Atom 1.0 document.",
              content: {
                "application/atom+xml": { schema: { type: "string" } },
              },
            },
          },
        },
      },
      "/.well-known/api-catalog": {
        get: {
          tags: ["discovery"],
          operationId: "getApiCatalog",
          summary: "RFC 9727 linkset pointing at every machine-readable document.",
          responses: {
            "200": {
              description: "Linkset document.",
              content: {
                "application/linkset+json": { schema: { type: "object" } },
              },
            },
          },
        },
      },
      "/.well-known/agent-skills/index.json": {
        get: {
          tags: ["discovery"],
          operationId: "getAgentSkills",
          summary: "Agent skills discovery index.",
          responses: {
            "200": {
              description: "Skills index.",
              content: { "application/json": { schema: { type: "object" } } },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Error: {
          type: "object",
          required: ["error"],
          properties: {
            error: {
              type: "object",
              required: ["code", "message", "status", "resolution"],
              properties: {
                code: {
                  type: "string",
                  enum: Object.keys(API_ERROR_CODES),
                  description: "Stable identifier. Branch on this, not on message.",
                },
                message: { type: "string" },
                status: { type: "integer" },
                resolution: {
                  type: "string",
                  description: "What the caller should do next.",
                },
                documentation: { type: "string", format: "uri" },
              },
            },
          },
        },
        RecentTrack: {
          type: "object",
          required: ["title", "artist", "album", "albumArt", "songUrl", "playedAt"],
          properties: {
            title: { type: "string" },
            artist: { type: "string" },
            album: { type: "string" },
            albumArt: { type: "string", format: "uri" },
            songUrl: { type: "string", format: "uri" },
            playedAt: { type: "string", format: "date-time" },
            context: {
              type: "object",
              description: "Where the track was played from, when Spotify reports it.",
              required: ["type", "url"],
              properties: {
                type: {
                  type: "string",
                  enum: ["playlist", "album", "artist", "show"],
                },
                name: { type: "string" },
                url: { type: "string", format: "uri" },
              },
            },
          },
        },
      },
    },
  };

  return new Response(JSON.stringify(spec, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
