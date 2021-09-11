export interface SongURI {
  readonly id: string;
  readonly url: string;
  readonly bitRate: BigInt;
  readonly bitSize: BigInt;
  readonly md5CheckSum: string;
  readonly fileType: string;
}