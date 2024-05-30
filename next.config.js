/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Spotify CDN for images.
    domains: ['i.scdn.co'],
  },
};

module.exports = nextConfig;
