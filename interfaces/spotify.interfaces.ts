type SpotifyImage = {
  height: number;
  url: string;
  width: number;
};

export type SpotifyArtistResponse = {
  external_urls: { [key: string]: string };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  type: "artist";
  uri: string;
};

export type SpotifyAlbumResponse = {
  album_type: string;
  artists: SpotifyArtistResponse[];
  available_markets: string[];
  external_urls: { [key: string]: string };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: "album";
  uri: string;
};

export type SpotifyTrackResponse = {
  album: SpotifyAlbumResponse;
  artists: SpotifyArtistResponse[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { [key: string]: string };
  external_urls: { [key: string]: string };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

export type SpotifyTopTracksResponse = {
  items: SpotifyTrackResponse[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  previous: null;
  next: string;
};

export type SpotifyTopArtistsResponse = {
  items: SpotifyArtistResponse[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  previous: null;
  next: string;
};

export type SpotifyStatusResponse = {
  timestamp: number;
  progress_ms: number;
  currently_playing_type: string;
  is_playing: boolean;
  context: {
    external_urls: { [key: string]: string };
    href: string;
    type: string;
    uri: string;
  };
  item: {
    album: SpotifyAlbumResponse;
    artists: SpotifyArtistResponse[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: { [key: string]: string };
    external_urls: { [key: string]: string };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
};

export type APITopTracksResponse = {
  artist: string;
  songUrl: string;
  title: string;
  image: string;
  album: string;
};

export type APITopArtistsResponse = {
  artist: string;
  image: string;
  link: string;
};

export type APINowPlayingResponse = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
};
