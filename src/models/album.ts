import { Artist } from "./artist";
import { Song } from "./song";

export interface Album {
  readonly id: string;
  readonly name: string;
  readonly coverImageUrl: string;
}

export interface AlbumDetail {
  readonly album: Album;
  readonly artists: Array<Artist>;
  readonly description: string;
  readonly publishDate: Date;
  readonly songs: Array<Song>;
}