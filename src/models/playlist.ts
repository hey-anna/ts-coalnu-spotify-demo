import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artists } from "./artists";
import { ExternalUrls, Images, Owner } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

// root에 바로 있어서, 객체형태가 되지 않아서 interface 사용할 수 없다
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;
// export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

// 01 공통된 타입 먼저 지정
// SimplifiedPlaylist tracks
// playlist tracks followers
export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Images[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist";
  uri?: string;
}

export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface Playlist extends BasePlaylist {
  tracks?: ApiResponse<PlaylistTrack>;
}

export interface PlaylistTrack {
  added_at: string | null;
  added_by: {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  track?: TrackObject | EpisodeObject; // 유니온 타입
}

// 트랙 나누기

// TrackObject
// EpisodeObject
// 공통 필드 존재하나, 옵셔널 여부 차이로 인해 Base 타입으로 묶지 않음

export interface TrackObject {
  album?: SimplifiedAlbum;
  artists?: Artists[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: {};
  restrictions?: {
    reason: string;
  };
  name?: string;
  popularity?: number;
  preview_url?: string | null; // Deprecated 더 이상 사용되지 않으며, 미래에 제거될 수 있습니다.
  track_number?: number;
  type?: string;
  uri?: string;
  is_local?: boolean;
}

export interface EpisodeObject {
  audio_preview_url: string | null; // Deprecated
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language?: string; // deprecated 사용되지 않으며, 대신 `languages`를 사용하세요.
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string; // "year" | "month" | "day";
  resume_point?: {
    fully_played: boolean;
    resume_position_ms: number;
  };
  type: string; // "episode"
  uri: string;
  restrictions?: {
    reason?: string;
  };
  show: ShowObject;
}

export interface ShowObject {
  available_markets: string[];
  copyrights: CopyrightObject[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
  total_episodes: number;
}

export interface CopyrightObject {
  text?: string;
  type?: string; // "C" | "P" - C = 저작권, P = 퍼포먼스(음원) 저작권
}

// 공통 필드
// interface BasePlayableItem {
//   name?: string;
//   duration_ms?: number;
//   explicit?: boolean;
//   external_urls?: ExternalUrls;
//   href?: string;
//   id?: string;
//   type?: string;
//   uri?: string;
//   is_playable?: boolean;
// }

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}
