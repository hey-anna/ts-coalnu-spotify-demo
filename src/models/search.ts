import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { ArtistObject, Artists } from "./artists";
import { SimplifiedPlaylist } from "./playlist";
import {
  EpisodeObject,
  ShowObject,
  SimplifiedAudioBook,
  TrackObject,
} from "./track";

export const enum SEARCH_TYPE {
  Album = "album",
  Artist = "artist",
  Playlist = "playlist",
  Track = "track",
  Show = "show",
  Episode = "episode",
  AudioBook = "audiobook",
}

export interface SearchRequestParams {
  q: string;
  type: SEARCH_TYPE[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
}

export interface SearchResponse {
  tracks?: ApiResponse<TrackObject>;
  artists?: ApiResponse<ArtistObject>;
  albums?: ApiResponse<SimplifiedAlbum>; // SimplifiedAlbumObject
  playlists?: ApiResponse<SimplifiedPlaylist>;
  show?: ApiResponse<ShowObject>;
  episode?: ApiResponse<EpisodeObject>; // SimplifiedEposode - 다른줄 알고 빼려 했으나 EpisodeObject 동일했움
  audiobook?: ApiResponse<SimplifiedAudioBook>;
}
