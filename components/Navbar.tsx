import Image from "next/image";
import Link from "next/link";

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 w-full bg-background bg-opacity-80 py-4 backdrop-blur-md backdrop-filter lg:py-8">
      <div className="relative mx-auto flex max-w-7xl justify-between px-6">
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

        <div className="flex items-center justify-center space-x-6 lg:space-x-12">
          <Link href="/">
            <a className="font-mono text-sm font-bold text-text sm:text-base">
              Home
            </a>
          </Link>

          <Link href="/spotify">
            <a className="ml-6 flex items-center justify-center">
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
