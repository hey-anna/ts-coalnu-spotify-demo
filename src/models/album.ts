import { ApiResponse } from "./apiResponse";
import { Artists } from "./artists";
import { ExternalIds, ExternalUrls, Images, Restrictions } from "./commonType";
import { CopyrightObject, TrackObject } from "./track";

export interface GetNewReleasesResponse {
  albums: ApiResponse<SimplifiedAlbum>;
}

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

// Get Several Albums
export interface GetSeveralAlbumsRequest {
  ids: string[]; // Spotify Album IDs (최대 20개)
  market?: string; // ISO 3166-1 alpha-2 (e.g., "KR", "US")
}

export interface AlbumDetail extends SimplifiedAlbum {
  tracks: ApiResponse<TrackObject>; // 여기 제너릭 사용
  copyrights: CopyrightObject[];
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
}

export interface GetSeveralAlbumsResponse {
  albums: AlbumDetail[];
}

// 1 TrackObject in
// - album?: SimplifiedAlbum;
// - artists?: Artists[]

// 4 ApiResponse - 제너릭

// 5 items in
// 6 artists? Artists - 형제
// 7 tracks - 형제
// 8 copyrights
// 9 ExternalIds

// SimplifiedAlbum
// Artists

// export interface ApiResponse<T> {
//   // 여기 티로 받아서
//   href: string;
//   limit: number;
//   next: string | null;
//   offset: number;
//   previous: string | null;
//   total: number;
//   items: T[]; // 동적 // 그 친구를 배열화시켜주겠다
// }

// SimplifiedAlbum
// ApiResponse ?
// + Artists
// api

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

//

// export interface AlbumDetail {
//   album_type: string // "album" | "single" | "compilation";
//   total_tracks: number;
//   available_markets: string[];
//   external_urls: ExternalUrls
//   href: string;
//   id: string;
//   images: Images[];
//   name: string;
//   release_date: string;
//   release_date_precision: string// "year" | "month" | "day";
//   restrictions?: Restrictions;
//   artists: Artists[];
//   type: "album";
//   uri: string;
// }
