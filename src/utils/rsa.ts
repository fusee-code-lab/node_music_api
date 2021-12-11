import * as crypto from 'crypto';

export function rsaEncrypt(buffer: Uint8Array | Buffer, key: string | Buffer) {
  const RSA_NO_PADDING = crypto.constants.RSA_NO_PADDING;

  const res = Buffer.concat([
    Buffer.alloc(128 - buffer.length),
    Buffer.from(buffer),
  ]);
  return crypto.publicEncrypt({ key: key, padding: RSA_NO_PADDING }, res);
};