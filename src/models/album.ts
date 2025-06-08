import { ApiResponse } from "./apiResponse";
import { Artists } from "./artists";
import { ExternalUrls, Images, Restrictions } from "./commonType";

export interface GetNewReleasesResponse {
  albums: ApiResponse<SimplifiedAlbum>;
}

// 얘네를 묶어서 타입화 - 템플릿화
// export interface GetNewReleasesResponse {
//   albums: {
//     href: string;
//     limit: number;
//     next: string | null;
//     offset: number;
//     previous: string | null;
//     total: number;
//     items: SimplifiedAlbum[];
//   };
// }

export interface SimplifiedAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  type: string;
  uri: string;
  artists: Artists[];
}
