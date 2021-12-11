export enum CloudSearchType {
  SONG,
  ALBUM,
  ARTIST,
  PLAY_LIST,
  USER,
  MV,
  LYRICS,
  RADIO_STATION,
  VIDEO
}

export namespace CloudSearchType {
  export function code(type: CloudSearchType): number {
    switch (type) {
      case CloudSearchType.SONG:
        return 1;
      case CloudSearchType.ALBUM:
        return 10;
      case CloudSearchType.ARTIST:
        return 100;
      case CloudSearchType.PLAY_LIST:
        return 1000;
      case CloudSearchType.USER:
        return 1002;
      case CloudSearchType.MV:
        return 1004;
      case CloudSearchType.LYRICS:
        return 1006;
      case CloudSearchType.RADIO_STATION:
        return 1009;
      case CloudSearchType.VIDEO:
        return 1014;
    }
  }
}