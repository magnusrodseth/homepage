import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import {
  MCP_INSTRUCTIONS,
  MCP_PROTOCOL_VERSION,
  MCP_SERVER_INFO,
  MCP_TOOLS,
  ToolInputError,
  callTool,
} from "@/lib/mcp";

/**
 * MCP endpoint, Streamable HTTP transport.
 *
 * Stateless: every request carries everything needed to answer it, so there is
 * no session to resume and no server-initiated stream to keep open. That is
 * what lets it run as an ordinary serverless function. Responses are plain
 * `application/json` rather than SSE, which the transport allows.
 */

const JSONRPC_VERSION = "2.0";

// JSON-RPC reserved codes.
const PARSE_ERROR = -32700;
const INVALID_REQUEST = -32600;
const METHOD_NOT_FOUND = -32601;
const INVALID_PARAMS = -32602;

type JsonRpcId = string | number | null;

const CORS_HEADERS = {
  // Read-only public data; any origin may call it.
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, MCP-Protocol-Version, Accept",
  "Access-Control-Expose-Headers": "MCP-Protocol-Version",
} as const;

const BASE_HEADERS = {
  ...CORS_HEADERS,
  "MCP-Protocol-Version": MCP_PROTOCOL_VERSION,
  "Cache-Control": "no-store",
} as const;

function result(id: JsonRpcId, value: unknown) {
  return NextResponse.json(
    { jsonrpc: JSONRPC_VERSION, id, result: value },
    { headers: BASE_HEADERS }
  );
}

function failure(id: JsonRpcId, code: number, message: string, status = 200) {
  return NextResponse.json(
    { jsonrpc: JSONRPC_VERSION, id, error: { code, message } },
    { status, headers: BASE_HEADERS }
  );
}

function handle(message: { method?: string; id?: JsonRpcId; params?: unknown }) {
  const id = message.id ?? null;
  const params = (message.params ?? {}) as Record<string, unknown>;

  switch (message.method) {
    case "initialize":
      return result(id, {
        protocolVersion: MCP_PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: MCP_SERVER_INFO,
        instructions: MCP_INSTRUCTIONS,
      });

    case "ping":
      return result(id, {});

    case "tools/list":
      return result(id, { tools: MCP_TOOLS });

    case "tools/call": {
      const name = String(params.name ?? "");
      const args = (params.arguments ?? {}) as Record<string, unknown>;

      try {
        const { structured, text } = callTool(name, args);
        return result(id, {
          content: [{ type: "text", text }],
          structuredContent: structured,
          isError: false,
        });
      } catch (error) {
        // A bad argument is reported inside the result, not as a protocol
        // error, so the model can see what went wrong and try again.
        if (error instanceof ToolInputError) {
          return result(id, {
            content: [{ type: "text", text: error.message }],
            isError: true,
          });
        }
        throw error;
      }
    }

    default:
      return failure(id, METHOD_NOT_FOUND, `Unknown method "${message.method}".`);
  }
}

export async function POST(req: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return failure(null, PARSE_ERROR, "Request body is not valid JSON.", 400);
  }

  // Notifications carry no id and expect no response body.
  const messages = Array.isArray(body) ? body : [body];
  const requests = messages.filter(
    (m): m is { method: string; id?: JsonRpcId; params?: unknown } =>
      typeof m === "object" && m !== null && "id" in m
  );

  if (requests.length === 0) {
    return new Response(null, { status: 202, headers: BASE_HEADERS });
  }

  if (requests.length > 1) {
    return failure(
      null,
      INVALID_REQUEST,
      "Batched requests are not supported; send one request per call.",
      400
    );
  }

  const request = requests[0];
  if (typeof request.method !== "string") {
    return failure(request.id ?? null, INVALID_REQUEST, "Missing `method`.", 400);
  }

  try {
    return handle(request);
  } catch {
    return failure(
      request.id ?? null,
      INVALID_PARAMS,
      "The tool could not be run with those arguments.",
      200
    );
  }
}

/**
 * The transport lets a server decline the optional server-to-client stream.
 * A plain GET returns the same descriptor `/.well-known/mcp` serves, so a
 * human or crawler opening the URL sees what this endpoint is.
 */
export function GET(): Response {
  return NextResponse.json(
    {
      name: MCP_SERVER_INFO.name,
      title: MCP_SERVER_INFO.title,
      version: MCP_SERVER_INFO.version,
      protocolVersion: MCP_PROTOCOL_VERSION,
      transport: "streamable-http",
      endpoint: `${siteConfig.url}/api/mcp`,
      authentication: "none",
      instructions: MCP_INSTRUCTIONS,
      tools: MCP_TOOLS.map((tool) => ({
        name: tool.name,
        title: tool.title,
        description: tool.description,
      })),
      documentation: `${siteConfig.url}/openapi.json`,
    },
    { headers: BASE_HEADERS }
  );
}

export function OPTIONS(): Response {
  return new Response(null, { status: 204, headers: BASE_HEADERS });
}
