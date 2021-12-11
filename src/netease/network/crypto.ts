import { aesEncrypt, AESMode, md5, rsaEncrypt } from '../../utils';
import { NeteasyMusicApiType } from './api_type';
import * as crypto from 'crypto';
import { base62sources, publicKey } from './constants';

export interface NeteasyEncryptedRequestData {
  params: string;
  encSecKey?: string;
}

export function neteasyEncrypt(
  type: NeteasyMusicApiType,
  url: string,
  requestData: Object
): NeteasyEncryptedRequestData {
  const apiKey = NeteasyMusicApiType.apiKey(type);

  switch (type) {
    case NeteasyMusicApiType.DESKTOP: {
      const jsonStr = JSON.stringify(requestData);
      const message = `nobody${url}use${jsonStr}md5forencrypt`;
      const digest = md5(Buffer.from(message, 'utf-8').toString());
      const data = `${url}-36cd479b6b5-${jsonStr}-36cd479b6b5-${digest}`;

      const encrypted = aesEncrypt(Buffer.from(data), AESMode.ECB, apiKey)
        .toString('hex')
        .toUpperCase();

      return {
        params: encrypted
      };
    }

    case NeteasyMusicApiType.WEB: {
      const jsonStr = JSON.stringify(requestData);

      const secretKey = crypto
        .randomBytes(16)
        .map((n) => base62sources.charAt(n % 62).charCodeAt(0));

      // FIXME: avoid hard code iv
      const encryptedParams = aesEncrypt(
        Buffer.from(
          aesEncrypt(Buffer.from(jsonStr), AESMode.CBC, apiKey, '0102030405060708').toString("base64")
        ),
        AESMode.CBC,
        secretKey,
        '0102030405060708'
      ).toString('base64');

      const encryptedSecretKey = rsaEncrypt(secretKey.reverse(), publicKey).toString('hex');

      return {
        params: encryptedParams,
        encSecKey: encryptedSecretKey
      };
    }

    case NeteasyMusicApiType.LINUX: {
      const jsonStr = JSON.stringify(requestData);

      const encryptedParams = aesEncrypt(Buffer.from(jsonStr), AESMode.ECB, apiKey)
        .toString('hex')
        .toUpperCase();

      return {
        params: encryptedParams
      };
    }
  }
}
