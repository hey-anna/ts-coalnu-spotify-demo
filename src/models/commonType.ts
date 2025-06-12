export interface ExternalUrls {
  spotify?: string;
}

export interface Images {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Restrictions {
  reason?: string;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface Owner {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  type?: "user"; // string
  uri?: string;
  display_name?: string | null;
}
