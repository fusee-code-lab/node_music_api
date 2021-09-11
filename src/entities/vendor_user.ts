export enum Gender {
  male,
  female
}

export interface VendorUser {
  readonly avatarImageUrl: string;
  readonly nickname: string;
  readonly signature: string;
  readonly description: string;

  readonly backgroundImageUrl: string;
  readonly provinceId: string;
  readonly cityId: string;
  readonly gender?: Gender;
}
