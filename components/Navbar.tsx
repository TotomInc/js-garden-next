import Image from "next/image";
import Link from "next/link";

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-background bg-opacity-80 py-4 backdrop-blur-md backdrop-filter">
      <div className="relative mx-auto flex max-w-[768px] justify-between px-6">
        <Link href="/" className="flex items-center justify-center">
          <a className="inline-flex">
            <Image src="/images/logo.svg" alt="" width={32} height={32} />

            <div className="ml-2 flex flex-col">
              <p className="font-assistant text-lg font-black leading-[0.75] text-heading">
                JS Garden
              </p>

              <p className="mt-1 font-mono text-[10px] font-medium uppercase leading-none tracking-wider text-text-alt">
                Thomas Cazade
              </p>
            </div>
          </a>
        </Link>

        <div className="flex items-center justify-center">
          <Link href="/spotify">
            <a className="flex items-center justify-center">
              <Image
                src="/images/spotify.svg"
                alt="Spotify"
                width={24}
                height={24}
              />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};
