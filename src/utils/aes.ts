import * as crypto from 'crypto';

export enum AESMode {
  ECB = 'ecb',
  CBC = 'cbc'
}

export function aesEncrypt(
  input: Uint8Array | Buffer,
  mode: AESMode,
  key: Uint8Array | Buffer,
  iv: string | Buffer = ''
): Buffer {
  const cipher = crypto.createCipheriv('aes-128-' + mode, key, iv);
  // cipher.setAutoPadding(true);

  return Buffer.concat([cipher.update(input), cipher.final()]);
}
