import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

/**
 * One JSON shape for every API failure, so an agent can branch on `code`
 * instead of parsing prose, and `resolution` tells it what to try next.
 */
export type ApiErrorBody = {
  error: {
    /** Stable machine-readable identifier. Never reworded. */
    code: ApiErrorCode;
    /** Human-readable summary. */
    message: string;
    /** Mirrors the HTTP status, for clients that only read the body. */
    status: number;
    /** What the caller should do about it. */
    resolution: string;
    /** Where the endpoint is described. */
    documentation: string;
  };
};

export const API_ERROR_CODES = {
  not_found: 404,
  method_not_allowed: 405,
  upstream_unavailable: 503,
  internal_error: 500,
} as const;

export type ApiErrorCode = keyof typeof API_ERROR_CODES;

const DOCUMENTATION_URL = `${siteConfig.url}/openapi.json`;

export function apiError(
  code: ApiErrorCode,
  message: string,
  resolution: string
): NextResponse<ApiErrorBody> {
  const status = API_ERROR_CODES[code];

  return NextResponse.json(
    { error: { code, message, status, resolution, documentation: DOCUMENTATION_URL } },
    {
      status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    }
  );
}
