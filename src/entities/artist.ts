import { VendorUser } from './vendor_user';

export interface Artist {
  readonly id: string;
  readonly name: string;
  readonly coverImageUrl: string;
}

export function buildArtist(artistData: any): Artist {
  return {
    id: artistData['id'].toString(),
    name: artistData['name'],
    coverImageUrl: artistData['img1v1Url']
  };
}

export function buildArtists(artistsData: any): Artist[] | undefined {
  return Array.isArray(artistsData) ? artistsData.map((e) => buildArtist(e)) : undefined;
}

export interface ArtistDetail {
  readonly artist: Artist;
  readonly briefDescription: string;
  readonly albumCount: number;
  readonly musicCount: number;
  readonly mvCount: number;
}
