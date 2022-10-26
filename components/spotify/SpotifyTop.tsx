import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

export const SpotifyTop: React.FC<{
  index: number;
  title: string;
  titleLink: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt: string;
}> = ({ index, title, titleLink, subtitle, imageUrl, imageAlt }) => (
  <div className="flex justify-between border-b border-text-alt border-opacity-10 pb-4">
    <div className="flex">
      <p className="mt-[2px] w-6 font-mono text-sm font-bold text-text-alt text-opacity-20">
        {index}
      </p>

      <div className="flex flex-col">
        <a
          href={titleLink}
          target="_blank"
          className="relative font-medium text-text-alt"
          rel="noreferrer"
        >
          {title}
          <ArrowTopRightOnSquareIcon
            className="-mt-3 ml-1 inline-block"
            width={14}
            height={16}
          />
        </a>

        {subtitle ? (
          <p className="text-text-alt text-opacity-50">{subtitle}</p>
        ) : null}
      </div>
    </div>

    <Image
      src={imageUrl}
      alt={imageAlt}
      width={48}
      height={48}
      style={{ maxHeight: "48px" }}
    />
  </div>
);
