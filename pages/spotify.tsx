import useSwr from "swr";

import type { APITopTracksResponse } from "../interfaces/spotify.interfaces";
import { fetcher } from "../lib/fetcher";
import { DefaultLayout } from "../components/DefaultLayout";
import { SEO } from "../components/SEO";
import { SpotifyTopTracks } from "../components/spotify/SpotifyTopTracks";

const PostsPage = () => {
  const { data } = useSwr<{ tracks: APITopTracksResponse[] }>(
    "/api/spotify/top-tracks",
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

        <div>{data ? <SpotifyTopTracks tracks={data.tracks} /> : null}</div>
      </DefaultLayout>
    </>
  );
};

export default PostsPage;
