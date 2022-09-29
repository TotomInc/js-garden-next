/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Allow Spotify CDN.
    domains: ['i.scdn.co'],
  },
  experimental: {
    legacyBrowsers: false,
  },
};

module.exports = nextConfig;
