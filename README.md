# `js-garden-next`

> Personal website where I write some articles about modern front-end web development.

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
# Connect Prisma to PlanetScale database MySQL.
# Use a local domain to route using `pscale connect` proxy.
# $ pscale connect <DATABASE_NAME> <BRANCH_NAME> --port 3309
DATABASE_URL='mysql://root@127.0.0.1:3309/<DATABASE_NAME>'

# Generate refresh token here:
# https://getyourspotifyrefreshtoken.herokuapp.com
# Scopes required for this website: user-top-read, user-read-currently-playing
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

Create `.env` for environment variables inside Prisma CLI (like `npx prisma db push`):

```env
# Prisma PlanetScale database proxy.
# Should be used only in local development with PlanetScale proxy:
# $ npx prisma db push
#
# See: https://planetscale.com/docs/tutorials/prisma-quickstart
DATABASE_URL='mysql://root@127.0.0.1:3309/<DATABASE_NAME>'
```

You may want to run a the `pscale connect` proxy command in parallel of the Next.js server, in order to point to a development database environment for your development needs:

```bash
pscale connect <DATABASE_NAME> <DATABASE_BRANCH> --port 3309
```

Run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
