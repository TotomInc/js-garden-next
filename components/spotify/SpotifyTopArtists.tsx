import type { APITopArtistsResponse } from "../../interfaces/spotify.interfaces";
import { SpotifyTopArtist } from "./SpotifyTopArtist";

export const SpotifyTopArtists: React.FC<{
  artists: APITopArtistsResponse[];
}> = ({ artists }) => (
  <div className="mx-auto w-full max-w-lg overflow-x-hidden rounded-sm bg-code-background px-8 py-6 shadow-lg">
    <h2 className="font-assistant text-2xl font-bold text-heading">
      Most played artists
    </h2>

    <p className="mt-1 mb-4 text-base text-text">From the last 4 weeks</p>

    <div className="flex flex-col space-y-3">
      {artists.map((artist, i) => (
        <SpotifyTopArtist key={artist.link} artist={artist} index={i} />
      ))}
    </div>
  </div>
);
