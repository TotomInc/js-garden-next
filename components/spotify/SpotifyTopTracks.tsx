import type { APITopTracksResponse } from "../../interfaces/spotify.interfaces";
import { SpotifyTopTrack } from "./SpotifyTopTrack";

export const SpotifyTopTracks: React.FC<{ tracks: APITopTracksResponse[] }> = ({
  tracks,
}) => (
  <div className="mx-auto w-full max-w-lg overflow-x-hidden rounded-md bg-code-background px-8 py-6 shadow-lg">
    <h2 className="font-assistant text-2xl font-bold text-heading">
      Most played tracks
    </h2>

    <p className="mt-1 mb-4 text-base text-text">From the last 4 weeks</p>

    <div className="flex flex-col space-y-3">
      {tracks.map((track, i) => (
        <SpotifyTopTrack key={track.songUrl} track={track} index={i} />
      ))}
    </div>
  </div>
);
