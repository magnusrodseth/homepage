import { RecentTrack } from "./data/types";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    // Spotify access tokens live 3600s; refresh well within that window.
    // `no-store` here would opt every consuming page out of static rendering.
    next: { revalidate: 3000 },
  });

  if (!response.ok) {
    console.error("Failed to refresh Spotify token:", response.statusText);
    return null;
  }

  const data = await response.json();
  return data.access_token;
}

type SpotifyContext = {
  type: "playlist" | "album" | "artist" | "show";
  uri: string;
  external_urls: { spotify: string };
} | null;

type SpotifyItem = {
  track: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
    external_urls: { spotify: string };
  };
  played_at: string;
  context: SpotifyContext;
};

async function getPlaylistName(
  playlistId: string,
  accessToken: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}?fields=name`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 300 },
      }
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.name;
  } catch {
    return null;
  }
}

export async function getRecentlyPlayedTracks(
  limit: number = 5
): Promise<RecentTrack[]> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?limit=${Math.min(limit, 50)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const items: SpotifyItem[] = data.items;

    const playlistIds = new Set<string>();
    for (const item of items) {
      if (item.context?.type === "playlist") {
        const id = item.context.uri.split(":").pop();
        if (id) playlistIds.add(id);
      }
    }

    const playlistNames = new Map<string, string>();
    await Promise.all(
      Array.from(playlistIds).map(async (id) => {
        const name = await getPlaylistName(id, accessToken);
        if (name) playlistNames.set(id, name);
      })
    );

    return items.map((item) => {
      let context: RecentTrack["context"];

      if (item.context) {
        const playlistId = item.context.uri.split(":").pop();
        context = {
          type: item.context.type,
          url: item.context.external_urls.spotify,
          name:
            item.context.type === "playlist" && playlistId
              ? playlistNames.get(playlistId)
              : item.context.type === "album"
                ? item.track.album.name
                : undefined,
        };
      }

      return {
        title: item.track.name,
        artist: item.track.artists.map((a) => a.name).join(", "),
        album: item.track.album.name,
        albumArt: item.track.album.images[0]?.url,
        songUrl: item.track.external_urls.spotify,
        playedAt: item.played_at,
        context,
      };
    });
  } catch (error) {
    console.error("Error fetching recently played tracks:", error);
    return [];
  }
}
