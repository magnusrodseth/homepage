# API & agent docs

Every way to read this site as a machine: Markdown, JSON, and MCP. No key, no rate limit.

Everything on this site is readable by machines as well as people. Nothing here needs a key, an account, or a quota, and none of it is rate limited. If you are an agent, start at [llms.txt](https://www.magnusrodseth.com/llms.txt): it says in one page what this site is a good source for and what it is not.

## Any page, as Markdown

Send `Accept: text/markdown` to any URL on this site and you get that page as Markdown instead of HTML.

```bash
curl -H 'Accept: text/markdown' https://www.magnusrodseth.com/blog/model-context-protocol
```

The same documents are addressable directly, which is handy when you cannot set headers:

| URL | Contents |
|-----|----------|
| `/md/index.md` | Home page |
| `/md/blog.md` | Every post, with dates and descriptions |
| `/md/blog/{slug}.md` | One post, front matter and body |
| `/md/projects.md` | Work history and projects |
| `/md/about.md`, `/md/contact.md`, `/md/privacy.md`, `/md/daily-drivers.md` | The other pages |

Both representations carry `Vary: Accept, Accept-Encoding`, so a shared cache will not hand you the wrong one. Links and images inside the Markdown are absolute, so you can fetch a document on its own and still resolve everything in it.

For the whole site in one request, [llms-full.txt](https://www.magnusrodseth.com/llms-full.txt) concatenates every page and post.

## JSON API

Versioned under `/api/v1/`. Read-only, no authentication.

```bash
# Every post, newest first
curl https://www.magnusrodseth.com/api/v1/posts

# One post, including its Markdown body
curl https://www.magnusrodseth.com/api/v1/posts/model-context-protocol
```

`GET /api/v1/posts` answers with a count and an array; each entry carries the slug, title, description, date, language, reading time, and links to the HTML, Markdown and JSON views. Where a post first ran somewhere else, `originalPublication` names the publication and links to the original.

`GET /api/v1/posts/{slug}` adds `content`, the post's Markdown source.

[openapi.json](https://www.magnusrodseth.com/openapi.json) is the machine-readable version of this page: every operation has a unique `operationId`, typed parameters, and a response schema, so it drops straight into a function-calling setup.

### Errors

Failures come back as JSON with the same shape every time. Branch on `error.code`, which is stable; `error.message` is written for people and may be reworded.

```json
{
  "error": {
    "code": "not_found",
    "message": "No post with the slug \"nope\".",
    "status": 404,
    "resolution": "List every slug at https://www.magnusrodseth.com/api/v1/posts.",
    "documentation": "https://www.magnusrodseth.com/openapi.json"
  }
}
```

The codes are `not_found`, `method_not_allowed`, `upstream_unavailable` and `internal_error`. A URL under `/api/` that matches nothing returns this shape rather than an HTML error page.

### Versioning

Inside a version, changes are additive only: new fields may appear, and existing fields keep their name, type and meaning. A breaking change gets a new prefix, `/api/v2/`. A retired version keeps answering for at least six months and sends `Deprecation` and `Sunset` headers on every response for that whole window, so you find out from the response rather than from a broken integration.

## MCP server

There is an MCP server at `/api/mcp`, over Streamable HTTP. It is stateless and unauthenticated: no session id, no SSE stream, plain JSON responses.

```json
{
  "mcpServers": {
    "magnusrodseth": {
      "type": "http",
      "url": "https://www.magnusrodseth.com/api/mcp"
    }
  }
}
```

Four read-only tools:

| Tool | What it does |
|------|--------------|
| `list_posts` | Every post, newest first, no bodies. Filter by `language`, cap with `limit` |
| `search_posts` | Substring search over titles, descriptions and bodies, with the surrounding sentence |
| `get_post` | One post by slug, with its full Markdown body |
| `get_page` | Home, blog index, projects, daily drivers, about, contact or privacy, as Markdown |

The descriptor lives at [/.well-known/mcp](https://www.magnusrodseth.com/.well-known/mcp). A bad argument comes back as `isError: true` inside the result, with a message saying what to do instead, rather than as a protocol-level error.

You can drive it with curl:

```bash
curl -sX POST https://www.magnusrodseth.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## Discovery

| URL | What |
|-----|------|
| [/llms.txt](https://www.magnusrodseth.com/llms.txt) | Index, plus what this site is and is not a good source for |
| [/openapi.json](https://www.magnusrodseth.com/openapi.json) | OpenAPI 3.1 description of every endpoint |
| [/.well-known/mcp](https://www.magnusrodseth.com/.well-known/mcp) | MCP server descriptor |
| [/.well-known/api-catalog](https://www.magnusrodseth.com/.well-known/api-catalog) | RFC 9727 linkset of everything above |
| [/.well-known/agent-skills/index.json](https://www.magnusrodseth.com/.well-known/agent-skills/index.json) | Agent skills discovery index |
| [/sitemap.xml](https://www.magnusrodseth.com/sitemap.xml) | Every public URL |
| [/feed.xml](https://www.magnusrodseth.com/feed.xml), [/atom.xml](https://www.magnusrodseth.com/atom.xml) | Blog feeds |

Every response also carries a `Link` header pointing at the api-catalog, the agent-skills index, the MCP descriptor and the sitemap, so one HEAD request is enough to find the rest.

## Limits and manners

There is no rate limit, so there are no `RateLimit` headers to read. Please still be reasonable: everything here is static and cached, and a sensible `User-Agent` that says who you are is appreciated. If something is missing or wrong, [tell me](https://www.magnusrodseth.com/contact).
