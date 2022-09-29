import { Suspense } from "react";
import useSwr from "swr";

import type {
  APITopTracksResponse,
  APITopArtistsResponse,
} from "../interfaces/spotify.interfaces";
import { fetcher } from "../lib/fetcher";
import { BlogLayout } from "../layouts/BlogLayout";
import { SEO } from "../components/SEO";
import { SpotifyTop } from "../components/spotify/SpotifyTop";

const PostsPage = () => {
  const tracks = useSwr<{ tracks: APITopTracksResponse[] }>(
    "/api/spotify/top-tracks",
    fetcher
  );

  const artists = useSwr<{ artists: APITopArtistsResponse[] }>(
    "/api/spotify/top-artists",
    fetcher
  );

  return (
    <>
      <SEO
        title="Spotify - JS Garden - Thomas Cazade"
        description="See what I'm currently listening to and view more stats about my top tracks, artists and albums."
      />

      <BlogLayout>
        <h1 className="mb-4 font-assistant text-5xl font-black tracking-tight text-white">
          Spotify Dashboard
        </h1>

        <p className="mb-12 text-text-alt">
          Curious about what I&apos;ve been listening to recently? The data
          present on this page is pulled from the{" "}
          <span className="text-accent">Spotify API</span> on a{" "}
          <span className="text-accent">Next.js API Route</span> with serverless
          functions.
        </p>

        <h2 className="mb-8 font-assistant text-4xl font-extrabold tracking-tight text-white">
          Top tracks
        </h2>

        <Suspense fallback={<p className="text-text">Loading...</p>}>
          <div className="mb-12 flex flex-col space-y-4">
            {tracks.data?.tracks
              ? tracks.data.tracks.map((track, i) => (
                  <SpotifyTop
                    key={track.songUrl}
                    index={i + 1}
                    title={track.title}
                    titleLink={track.songUrl}
                    subtitle={track.artist}
                    imageUrl={track.image}
                    imageAlt={track.album}
                  />
                ))
              : null}
          </div>
        </Suspense>

        <h2 className="mb-8 font-assistant text-4xl font-extrabold tracking-tight text-white">
          Top artists
        </h2>

        <Suspense fallback={<p className="text-text">Loading...</p>}>
          <div className="flex flex-col space-y-4">
            {artists.data?.artists
              ? artists.data.artists.map((artist, i) => (
                  <SpotifyTop
                    key={artist.link}
                    index={i + 1}
                    title={artist.artist}
                    titleLink={artist.link}
                    imageUrl={artist.image}
                    imageAlt={artist.artist}
                  />
                ))
              : null}
          </div>
        </Suspense>
      </BlogLayout>
    </>
  );
};

export default PostsPage;
