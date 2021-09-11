import { Album } from "./album";
import { Artist } from "./artist";

export interface Song {
  readonly id: string;
  readonly name: string;
  readonly artists: Array<Artist>;
  readonly millSecondsDuration: number;
  readonly album: Album;
  readonly mvId?: string;
}

export enum SongQualityLevel {
  HEIGHT,
  MEDIUM,
}

export interface SongQualityItem {
  readonly bitRate: BigInt,
  readonly bitSize: BigInt,
}

export interface SongQuality {
  readonly high?: SongQualityItem,
  readonly medium?: SongQualityItem,
  readonly low?: SongQualityItem,
}

export interface SongDetail {
  readonly song: Song;
  readonly quality: SongQuality;
}