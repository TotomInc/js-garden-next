# `js-garden-next`

> Personal website where I write some articles about front-end web development.

## Getting Started

Make sure you are using Node v16 LTS:

```bash
# Install if not already done.
nvm install 16
# Use if already installed.
nvm use 16
```

Create `.env.local` for environment variables inside the Next.js server:

```env
# Generate refresh token here:
# https://getyourspotifyrefreshtoken.herokuapp.com
# Scopes required for this website: user-top-read, user-read-currently-playing
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

Run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
