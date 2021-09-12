export interface VendorUser {
  readonly id: string;
  readonly nickname: string;
}

export function buildVendorUser(creatorData: any): VendorUser {
  return {
    id: creatorData['userId'].toString(),
    nickname: creatorData['nickname']
  };
}
