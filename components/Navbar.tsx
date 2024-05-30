"use client";

import Image from "next/image";
import Link from "next/link";

import { Logo } from "./Logo";

export function Navbar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 w-full bg-background bg-opacity-80 backdrop-blur-md backdrop-filter">
      <header className="py-4">
        <div className="relative mx-auto flex max-w-3xl justify-between px-6">
          <Link href="/" className="inline-flex items-center justify-center">
            <Logo />
          </Link>

          <div className="flex items-center justify-center space-x-6 lg:space-x-12">
            <Link href="/" className="font-mono text-sm text-text-alt">
              Home
            </Link>

            <Link href="/spotify">
              <Image
                className="flex items-center justify-center"
                src="/images/spotify.svg"
                alt="Spotify"
                width={24}
                height={24}
                unoptimized
              />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
