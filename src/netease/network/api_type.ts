import fetch, { HeaderInit, RequestInit } from 'node-fetch';
import { chooseUserAgent, HttpHeaders, HttpMethod, UserAgentType } from '../../utils';

export enum NeteasyMusicApiType {
  /// 非 linux 桌面端 Api，前缀为 `eapi`
  DESKTOP,
  /// web 端 Api，前缀为 `weapi`
  WEB,
  /// linux 桌面端 Api，前缀为 `linuxapi`
  LINUX
}

export namespace NeteasyMusicApiType {
  export function apiPrefix(type: NeteasyMusicApiType) {
    switch (type) {
      case NeteasyMusicApiType.DESKTOP:
        return 'eapi';
      case NeteasyMusicApiType.WEB:
        return 'weapi';
      case NeteasyMusicApiType.LINUX:
        return 'linuxapi';
    }
  }

  export function apiKey(type: NeteasyMusicApiType): Buffer {
    switch (type) {
      case NeteasyMusicApiType.DESKTOP:
        return Buffer.from('e82ckenh8dichen8');
      case NeteasyMusicApiType.WEB:
        return Buffer.from('0CoJUm6Qyw8W8jud');
      case NeteasyMusicApiType.LINUX:
        return Buffer.from('rFgB&h#%2?^eDg:Q');
    }
  }
}