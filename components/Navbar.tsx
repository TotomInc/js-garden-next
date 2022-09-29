import Image from "next/image";
import Link from "next/link";

import { Logo } from "./Logo";

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 w-full bg-background bg-opacity-80 py-4 backdrop-blur-md backdrop-filter lg:py-6">
      <div className="relative mx-auto flex max-w-3xl justify-between px-6">
        <Link href="/" className="flex items-center justify-center">
          <a className="inline-flex">
            <Logo />
          </a>
        </Link>

        <div className="flex items-center justify-center space-x-6 lg:space-x-12">
          <Link href="/">
            <a className="font-mono text-sm text-text-alt">Home</a>
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
