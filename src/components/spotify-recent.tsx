import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { getRecentlyPlayedTracks } from "@/lib/spotify";
import { Muted, Small } from "@/components/ui/typography";

const SPOTIFY_PROFILE_URL =
  "https://open.spotify.com/user/e4iw89apt9lhvh86de541bo36";

export async function SpotifyRecentTracks() {
  const tracks = await getRecentlyPlayedTracks(5);

  if (tracks.length === 0) {
    return (
      <div className="text-muted-foreground text-sm">
        No recent tracks available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tracks.map((track, index) => (
        <Link
          key={`${track.songUrl}-${index}`}
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group hover:bg-muted/50 rounded-md p-2 -mx-2 transition-colors"
        >
          {track.albumArt && (
            <Image
              src={track.albumArt}
              alt={track.album}
              width={48}
              height={48}
              className="rounded-md flex-shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
              {track.title}
            </p>
            <Muted className="text-xs truncate block">{track.artist}</Muted>
            {track.context?.name && (
              <span className="text-xs text-muted-foreground">
                from playlist <em>{track.context.name}</em>
              </span>
            )}
          </div>
          <Small className="text-muted-foreground flex-shrink-0">
            {formatDistanceToNow(new Date(track.playedAt), { addSuffix: true })}
          </Small>
        </Link>
      ))}

      <Link
        href={SPOTIFY_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors pt-2"
      >
        <SpotifyIcon className="w-4 h-4" />
        View profile on Spotify
      </Link>
    </div>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}
