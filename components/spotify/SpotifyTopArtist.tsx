import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

import type { APITopArtistsResponse } from "../../interfaces/spotify.interfaces";

export const SpotifyTopArtist: React.FC<{
  artist: APITopArtistsResponse;
  index: number;
}> = ({ artist, index }) => (
  <div className="flex w-full items-center py-2">
    <p className="mr-4 w-8 min-w-[2rem] font-mono text-lg text-text text-opacity-30 sm:w-12 sm:min-w-[3rem] sm:text-2xl">
      #{index + 1}
    </p>

    <div className="relative flex min-w-[3rem] items-center sm:w-16 sm:min-w-[4rem]">
      <Image height={64} width={64} src={artist.image} alt={artist.artist} />
    </div>

    <div className="ml-4 flex w-full flex-col space-y-1 sm:ml-6">
      <a
        href={artist.link}
        className="font-assistant text-sm font-semibold text-text hover:underline sm:text-base"
      >
        {artist.artist}
        <ArrowTopRightOnSquareIcon
          className="-mt-3 ml-1 inline-block"
          width={16}
          height={16}
        />
      </a>
    </div>
  </div>
);
