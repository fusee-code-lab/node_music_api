import fetch, { HeaderInit, RequestInit, Response } from 'node-fetch';
import { URL } from 'url';
import { chooseUserAgent, HttpHeaders, HttpMethod, UserAgentType } from '../../utils';
import { NeteasyMusicApiType } from './api_type';
import { neteasyEncrypt } from './crypto';
import querystring from "querystring";


export class NeteasyNetwork {
  public static readonly BASE_URL = 'https://music.163.com';
  private readonly apiType: NeteasyMusicApiType;

  private constructor(type: NeteasyMusicApiType) {
    this.apiType = type;
  }

  public static buildFor(type: NeteasyMusicApiType): NeteasyNetwork {
    return new NeteasyNetwork(type);
  }

  private fullUrl(path: string): string {
    const res = new URL(NeteasyNetwork.BASE_URL);
    res.pathname = path;
    return res.toString();
  }

  async get(path: string, body: Object): Promise<Response> {
    return this.request(HttpMethod.GET, path, body);
  }

  async post(path: string, body: Object): Promise<Response> {
    return this.request(HttpMethod.POST, path, body);
  }

  private async request(method: HttpMethod, path: string, body: Object): Promise<Response> {
    const url = this.fullUrl(path);
    const data = body;

    let requestUrl: string;
    let requestInit: RequestInit;

    switch (this.apiType) {
      case NeteasyMusicApiType.DESKTOP: {
        const headers = this.buildHeaders(path, {}, UserAgentType.PC);
        const requestData = neteasyEncrypt(this.apiType, url.toString(), data);

        requestUrl = url.toString().replace(/\w*api/g, NeteasyMusicApiType.apiPrefix(this.apiType));

        requestInit = { headers, body: JSON.stringify(requestData) };
        break;
      }

      case NeteasyMusicApiType.WEB: {
        const headers = this.buildHeaders(path, {}, UserAgentType.PC);
        const csrfToken = ''; // TODO:

        const requestData = neteasyEncrypt(this.apiType, url.toString(), data);
        const newUrl = url.replace(/\w*api/g, NeteasyMusicApiType.apiPrefix(this.apiType));

        requestUrl = newUrl;
        requestInit = { headers, body: querystring.stringify(requestData as unknown as any) };

        break;
      }

      case NeteasyMusicApiType.LINUX: {
        const headers = this.buildHeaders(path, {}, UserAgentType.LINUX_DESKTOP);

        const requestData = neteasyEncrypt(this.apiType, url.toString(), {
          params: data,
          // FIXME:
          url: url.toString().replace(/\w*api/g, 'api'),
          method
        });
        const newPath = '/api/linux/forward';

        requestUrl = this.fullUrl(newPath);
        requestInit = { headers, body: JSON.stringify(requestData) };
        break;
      }
    }

    return fetch(requestUrl, { ...requestInit, method });
  }

  private buildHeaders(path: string, init: RequestInit = {}, ua: UserAgentType): HeaderInit {
    const baseHeaders: HeaderInit = {
      [HttpHeaders.acceptHeader]: '*/*',
      [HttpHeaders.acceptLanguageHeader]: 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
      [HttpHeaders.connectionHeader]: 'keep-alive',
      [HttpHeaders.contentTypeHeader]: 'application/x-www-form-urlencoded',
      [HttpHeaders.hostHeader]: 'music.163.com',
    };

    const headers: HeaderInit = init.headers ?? {};
    headers[HttpHeaders.userAgentHeader] = chooseUserAgent(ua);

    if (init.method?.toUpperCase() === HttpMethod.POST) {
      headers[HttpHeaders.contentTypeHeader] = 'application/x-www-form-urlencoded';
    }
    if (path.includes('music.163.com')) {
      headers[HttpHeaders.refererHeader] = 'https://music.163.com';
    }

    return { ...baseHeaders, ...headers };
  }
}
