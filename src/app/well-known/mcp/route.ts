import { siteConfig } from "@/config/site";
import {
  MCP_INSTRUCTIONS,
  MCP_PROTOCOL_VERSION,
  MCP_SERVER_INFO,
  MCP_TOOLS,
} from "@/lib/mcp";

export const dynamic = "force-static";

/**
 * Discovery document for the MCP server, served at /.well-known/mcp via a
 * rewrite in next.config.mjs (the App Router cannot hold a directory whose
 * name starts with a dot). It only describes the server; the handshake itself
 * happens against the `endpoint` below.
 */
export function GET(): Response {
  const body = {
    name: MCP_SERVER_INFO.name,
    title: MCP_SERVER_INFO.title,
    description: `Read-only access to the writing and pages on ${siteConfig.url}.`,
    version: MCP_SERVER_INFO.version,
    protocolVersion: MCP_PROTOCOL_VERSION,
    instructions: MCP_INSTRUCTIONS,
    servers: [
      {
        name: MCP_SERVER_INFO.name,
        transport: "streamable-http",
        url: `${siteConfig.url}/api/mcp`,
        authentication: { type: "none" },
      },
    ],
    // Repeated at the top level because some clients read the shape above and
    // others the flat one; both point at the same endpoint.
    transport: "streamable-http",
    endpoint: `${siteConfig.url}/api/mcp`,
    capabilities: { tools: { listChanged: false } },
    tools: MCP_TOOLS.map((tool) => ({
      name: tool.name,
      title: tool.title,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
    documentation: `${siteConfig.url}/openapi.json`,
    contact: siteConfig.email.replace(/^mailto:/, ""),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
