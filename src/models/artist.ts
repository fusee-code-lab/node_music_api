import { VendorUser } from "./vendor_user";

export interface Artist {
  readonly id: string;
  readonly name: string;
  readonly coverImageUrl: string;
  readonly user: VendorUser;
  readonly briefDescription: string;
  readonly albumCount: number;
  readonly musicCount: number;
  readonly mvCount: number;
}