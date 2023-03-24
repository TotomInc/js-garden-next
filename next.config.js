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
  async rewrites() {
    return [
      {
        source: '/js/hello-core.js',
        destination: 'https://hello.jsgarden.co/js/script.js'
      },
      {
        source: '/api/event',
        destination: 'https://hello.jsgarden.co/api/event'
      }
    ];
  },
};

module.exports = nextConfig;
