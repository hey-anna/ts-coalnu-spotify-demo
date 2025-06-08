import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Images, Owner } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

// root에 바로 있어서, 객체형태가 되지 않아서 interface 사용할 수 없다
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface SimplifiedPlaylist {
  collaborative?: boolean;
  description?: string;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Images[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  tracks?: {
    href?: string;
    total?: number;
  };
  type?: string;
  uri?: string;
}
