"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlausible } from "next-plausible";
import { ArrowLongRightIcon, XMarkIcon } from "@heroicons/react/20/solid";

import { Logo } from "./Logo";

const BANNER_NAME = "isUseformBannerVisible";

export const Navbar: React.FC = () => {
  const plausible = usePlausible();

  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    const state = window.localStorage.getItem(BANNER_NAME);

    if (state === "hidden") {
      setIsBannerVisible(false);
    } else {
      setIsBannerVisible(true);
    }
  }, [setIsBannerVisible]);

  const handleHideBanner = () => {
    plausible("hide-banner");
    setIsBannerVisible(false);
    window.localStorage.setItem(BANNER_NAME, "hidden");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10 w-full bg-background bg-opacity-80 backdrop-blur-md backdrop-filter">
      {isBannerVisible ? (
        <div className="relative bg-code-background py-3">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-between space-y-2 px-6 sm:flex-row sm:space-y-0">
            <p className="font-assistant font-medium text-white">
              Painless professional forms for your next project?
            </p>

            <a
              href="https://useform.co"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center rounded-md bg-gradient-to-br from-background to-black/30 px-6 py-2 text-sm font-medium text-white"
            >
              Check-out Useform{" "}
              <ArrowLongRightIcon className="ml-2 h-auto w-4 text-white transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
            </a>
          </div>

          <button
            type="button"
            className="absolute top-0 right-0 mt-12 mr-6 sm:mt-4"
            onClick={handleHideBanner}
          >
            <XMarkIcon
              aria-describedby="Close banner"
              className="h-auto w-6 text-white"
            />
          </button>
        </div>
      ) : null}

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
              />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};
