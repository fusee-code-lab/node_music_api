import { Album } from './album';
import { Artist } from './artist';

export interface Song {
  readonly id: string;
  readonly name: string;
  readonly artists: Array<Artist>;
  readonly millSecondsDuration: number;
  readonly album: Album;
  readonly mvId?: string;
}

export function buildSong(songData: any, artists: Artist[], album: Album) {
  return {
    id: songData['id'],
    name: songData['name'],
    artists,
    millSecondsDuration: songData['dt'],
    album
  };
}

export enum SongQualityLevel {
  HEIGHT,
  MEDIUM
}

export interface SongQualityItem {
  readonly bitRate: BigInt;
  readonly bitSize: BigInt;
}

export interface SongQuality {
  readonly high?: SongQualityItem;
  readonly medium?: SongQualityItem;
  readonly low?: SongQualityItem;
}

export function buildSongQuality(hight: any, medium: any, low: any): SongQuality {
  return {
    high: !!hight
      ? {
          bitRate: BigInt(hight['br']),
          bitSize: BigInt(hight['size'])
        }
      : hight,
    medium: !!medium
      ? {
          bitRate: BigInt(medium['br']),
          bitSize: BigInt(medium['size'])
        }
      : medium,
    low: !!low
      ? {
          bitRate: BigInt(low['br']),
          bitSize: BigInt(low['size'])
        }
      : low
  };
}

export interface SongDetail {
  readonly song: Song;
  readonly quality: SongQuality;
}
