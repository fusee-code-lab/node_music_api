export interface SongLyricsSentence {
  readonly ms: BigInt;
  readonly startTime: string;
  readonly content: string;
}

export interface SongLyricsItem {
  readonly strRaw: string,
  readonly content: Array<SongLyricsSentence>,
}

export interface SongLyrics {
  readonly original?: SongLyricsItem,
  readonly translated?: SongLyricsItem,
}