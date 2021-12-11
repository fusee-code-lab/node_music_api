import { Artist } from "./artist";
import { Song } from "./song";

export interface Album {
  readonly id: string;
  readonly name: string;
  readonly coverImageUrl: string;
}

export function buildAlbum(albumData: any): Album {
  return {
    id: albumData['id'].toString(),
    name: albumData['name'],
    coverImageUrl: albumData['picUrl']
  };
}

export function buildAlbums(albumsData: any): Album[] | undefined {
  if (Array.isArray(albumsData)) {
    return albumsData.map((e) => ({
      id: e['id'].toString(),
      name: e['name'],
      coverImageUrl: e['picUrl']
    }));
  }
  return undefined;
}

export interface AlbumDetail {
  readonly album: Album;
  readonly artists: Array<Artist>;
  readonly description: string;
  readonly publishDate: Date;
  readonly songs: Array<Song>;
}