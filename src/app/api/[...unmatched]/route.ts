import { apiError } from "@/lib/api-error";
import { siteConfig } from "@/config/site";

/**
 * Catch-all for the API namespace. Without it an unknown `/api/*` path falls
 * through to the HTML 404 page, which an agent calling the API cannot parse.
 */
function unmatched() {
  return apiError(
    "not_found",
    "No such API endpoint.",
    `Fetch ${siteConfig.url}/openapi.json for the list of available endpoints.`
  );
}

export const GET = unmatched;
export const POST = unmatched;
export const PUT = unmatched;
export const PATCH = unmatched;
export const DELETE = unmatched;
export const HEAD = unmatched;
