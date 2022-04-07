export interface IImages {
  height: number;
  url: string;
  width: number;
}

export interface IArtist {
  external_urls: {
    spotify: string;
  },
  followers: {
    href: string;
    total: number;
  },
  genres: string[],
  href: string;
  id: string;
  images: IImages[]
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface IAlbum {
  album_type: string;
  artist: IArtist[]
  external_urls: {
    spotify: string;
  }
  href: string;
  id: string;
  images: IImages[]
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;

}

export interface ITracks {
  album: {
    album_type: string;
    artists: IArtist[]
    external_urls: {spotify: string;}
    href: string;
    id: string;
    images: IImages[]
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  },
  artists: IArtist[],
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {isrc: string;}
  external_urls: {spotify: string;}
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface AxiosSearchResponse {
  data: {
    artists: {
      href: string;
      limit: number;
      offset: number;
      total: number;
      items: IArtist[]
    }
    tracks: {
      href: string;
      limit: number;
      offset: number;
      total: number;
      items: ITracks[]
    }
    albums: {
      href: string;
      items: IAlbum[]
      limit: number;
      next: string;
      offset: number;
      previous: string;
      total: number;

    }
   
  }
}

export interface AxiosTrackResponse {
  data: {
    artists: {
      href: string;
      limit: number;
      offset: number;
      total: number;
      items: IArtist[]
    }
    tracks: {
      href: string;
      limit: number;
      offset: number;
      total: number;
      items: ITracks[]
    }
   
  }
}