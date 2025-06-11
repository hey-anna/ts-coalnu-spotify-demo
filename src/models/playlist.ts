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
