import { SpotifyTrack } from "./data/types";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

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
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to refresh Spotify token:", response.statusText);
    return null;
  }

  const data = await response.json();
  return data.access_token;
}

export async function getNowPlaying(): Promise<SpotifyTrack> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { isPlaying: false };
  }

  const response = await fetch(SPOTIFY_NOW_PLAYING_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status === 204 || response.status > 400) {
    return { isPlaying: false };
  }

  const data = await response.json();

  if (!data.is_playing || !data.item) {
    return { isPlaying: false };
  }

  return {
    isPlaying: true,
    title: data.item.name,
    artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
    album: data.item.album.name,
    albumArt: data.item.album.images[0]?.url,
    songUrl: data.item.external_urls.spotify,
  };
}

export async function getRecentlyPlayed(): Promise<SpotifyTrack> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { isPlaying: false };
  }

  const response = await fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return { isPlaying: false };
  }

  const data = await response.json();
  const track = data.items?.[0]?.track;

  if (!track) {
    return { isPlaying: false };
  }

  return {
    isPlaying: false,
    title: track.name,
    artist: track.artists.map((a: { name: string }) => a.name).join(", "),
    album: track.album.name,
    albumArt: track.album.images[0]?.url,
    songUrl: track.external_urls.spotify,
  };
}

export async function getSpotifyData(): Promise<SpotifyTrack | null> {
  const nowPlaying = await getNowPlaying();

  if (nowPlaying.isPlaying) {
    return nowPlaying;
  }

  return null;
}

export function isSpotifyConfigured(): boolean {
  return !!(
    process.env.SPOTIFY_CLIENT_ID &&
    process.env.SPOTIFY_CLIENT_SECRET &&
    process.env.SPOTIFY_REFRESH_TOKEN
  );
}
