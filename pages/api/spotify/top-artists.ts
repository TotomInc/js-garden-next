import type { NextApiRequest, NextApiResponse } from "next";

import type {
  SpotifyTopArtistsResponse,
  APITopArtistsResponse,
} from "../../../interfaces/spotify.interfaces";
import { getTopArtists } from "../../../lib/spotify";

export default async function topTracks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getTopArtists();
  const { items } = (await response.json()) as SpotifyTopArtistsResponse;

  const artists: APITopArtistsResponse[] = items.slice(0, 10).map((artist) => ({
    artist: artist.name,
    image: artist.images[0].url,
    link: artist.external_urls.spotify,
  }));

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json({ artists });
}
