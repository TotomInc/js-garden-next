import useSwr from "swr";

import type {
  APITopTracksResponse,
  APITopArtistsResponse,
} from "../interfaces/spotify.interfaces";
import { fetcher } from "../lib/fetcher";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { SEO } from "../components/SEO";
import { SpotifyTopTracks } from "../components/spotify/SpotifyTopTracks";
import { SpotifyTopArtists } from "../components/spotify/SpotifyTopArtists";

const PostsPage = () => {
  const { data: topTracksData } = useSwr<{ tracks: APITopTracksResponse[] }>(
    "/api/spotify/top-tracks",
    fetcher
  );

  const { data: topArtistsData } = useSwr<{ artists: APITopArtistsResponse[] }>(
    "/api/spotify/top-artists",
    fetcher
  );

  return (
    <>
      <SEO
        title="Spotify - JS Garden - Thomas Cazade"
        description="See what I'm currently listening to and view more stats about my top tracks, artists and albums."
      />

      <DefaultLayout>
        <h1 className="mb-8 font-assistant text-3xl font-black text-heading">
          My Spotify Dashboard
        </h1>

        <div className="flex flex-col lg:flex-row">
          {topTracksData ? (
            <SpotifyTopTracks tracks={topTracksData.tracks} />
          ) : null}

          {topArtistsData ? (
            <SpotifyTopArtists artists={topArtistsData.artists} />
          ) : null}
        </div>
      </DefaultLayout>
    </>
  );
};

export default PostsPage;
