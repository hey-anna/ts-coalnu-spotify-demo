import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Images, Owner } from "./commonType";
import { EpisodeObject, TrackObject } from "./track";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

// root에 바로 있어서, 객체형태가 되지 않아서 interface 사용할 수 없다
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;
export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

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
  tracks: ApiResponse<PlaylistTrack>;
  // tracks?: ApiResponse<PlaylistTrack>;
}

export interface PlaylistTrack {
  added_at: string | null;
  added_by: {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  } | null;
  is_local: boolean;
  track?: TrackObject | EpisodeObject; // 유니온 타입
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
  limit?: number;
  offset?: number;
}

export interface CreatePlaylistRequest {
  name: string;
  playListPublic?: boolean; // public : Binding element 'public' implicitly has an 'any' type.
  collaborative?: boolean;
  description?: string;
}

export interface AddTrackToPlaylistRequest {
  playlist_id: string; // 어떤 플레이리스트에 추가할지
  uris: string[]; // 추가할 트랙들의 Spotify URI 목록 - 필수값이라 젹혀있지않지만, 400에러 예상되어 미리 필수로 지정
  position?: number; // 몇 번째 위치에 삽입할지 (선택)
}

export interface AddTrackToPlaylistResponse {
  snapshot_id: string;
}
