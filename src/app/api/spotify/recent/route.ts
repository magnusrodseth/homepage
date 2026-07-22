import { NextResponse } from "next/server";
import { getRecentlyPlayedTracks } from "@/lib/spotify";

// Request-time only: Vercel's build network cannot reach accounts.spotify.com,
// so the homepage stays static and this route fills the section in the browser.
export async function GET() {
  const tracks = await getRecentlyPlayedTracks(5);

  return NextResponse.json(tracks, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
