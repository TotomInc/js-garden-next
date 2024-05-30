type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

const authorizationToken = Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64",
);

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PROFILE_ENDPOINT = `https://api.spotify.com/v1/me`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists?time_range=short_term`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const getDefaultHeaders = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authorizationToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken || "",
    }),
  });

  const { access_token, refresh_token } =
    await (response.json() as Promise<SpotifyTokenResponse>);

  return { accessToken: access_token, refreshToken: refresh_token };
};

export const getNowPlaying = async () => {
  const { accessToken } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: { ...getDefaultHeaders(accessToken) },
  });
};

export const getTopTracks = async () => {
  const { accessToken } = await getAccessToken();

  return fetch(TOP_TRACKS_ENDPOINT, {
    headers: { ...getDefaultHeaders(accessToken) },
  });
};

export const getTopArtists = async () => {
  const { accessToken } = await getAccessToken();

  return fetch(TOP_ARTISTS_ENDPOINT, {
    headers: { ...getDefaultHeaders(accessToken) },
  });
};

export const getProfile = async () => {
  const { accessToken } = await getAccessToken();

  return fetch(PROFILE_ENDPOINT, {
    headers: { ...getDefaultHeaders(accessToken) },
  });
};
