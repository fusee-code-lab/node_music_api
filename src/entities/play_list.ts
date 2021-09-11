import { VendorUser } from "./vendor_user";

export interface PlayListTag {
  readonly name: string;
}

export interface PlayList {
  readonly id: string;
  readonly name: string;
  readonly createTime: Date;
  readonly updateTime: Date;
  readonly coverImageUrl: string;
  readonly description: string;
  readonly tags: Array<PlayListTag>;
  readonly creator: VendorUser;
  readonly songsCount: number;
}