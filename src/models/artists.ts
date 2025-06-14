import { ExternalUrls, Followers, Images } from "./commonType";

export interface Artists {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}

export interface ArtistObject {
  external_urls?: ExternalUrls;
  followers?: Followers;
  genres?: string[];
  href?: string;
  id?: string;
  images?: Images[];
  name?: string;
  popularity?: number;
  type?: "artist";
  uri?: string;
}
