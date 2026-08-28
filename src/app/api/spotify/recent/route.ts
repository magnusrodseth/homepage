import { NextResponse } from "next/server";
import { getRecentlyPlayedTracks } from "@/lib/spotify";
import { apiError } from "@/lib/api-error";

// Request-time only: Vercel's build network cannot reach accounts.spotify.com,
// so the homepage stays static and this route fills the section in the browser.
export async function GET() {
  try {
    const tracks = await getRecentlyPlayedTracks(5);

    // The library swallows auth and network failures and returns nothing, so
    // an empty list here means Spotify did not answer, not that nothing played.
    if (tracks.length === 0) {
      return apiError(
        "upstream_unavailable",
        "Spotify did not return any recently played tracks.",
        "The Spotify credentials may be missing or the refresh token revoked. Retry later; this endpoint is decorative and not required to read the site."
      );
    }

    return NextResponse.json(tracks, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return apiError(
      "internal_error",
      "Failed to read recently played tracks.",
      "Retry later. This endpoint is decorative and not required to read the site."
    );
  }
}
