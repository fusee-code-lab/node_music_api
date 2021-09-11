import { Response } from 'node-fetch';
import { ApiProtocol, CombineSearchResult } from '../api_protocol';
import { SearchResult, Song, PlayList, Album, Artist } from '../entities';
import { ListResponsePack } from '../models';
import { CloudSearchType } from './models';
import { NeteasyMusicApiType, NeteasyNetwork } from './network';
import querystring from "querystring";

export class NeteasyApi implements ApiProtocol {
  private readonly desktopApi = NeteasyNetwork.buildFor(NeteasyMusicApiType.WEB);

  searchSongs(pattern: string): SearchResult<string, ListResponsePack<Song>> {
    return this.generalSearch<Song, string>(CloudSearchType.SONG, pattern, (data) => {
      const songsData = data['result']['songs'];

      if (!Array.isArray(songsData)) {
        return undefined;
      }

      return songsData.map((e) => {
        const artistsData = e['ar']; // array
        const albumData = e['al']; // object // TODO: isObject

        // TODO: 这里的 artist 并没有 cover url，将该字段设为 Optional
        const artists: Artist[] = Array.isArray(artistsData)
          ? artistsData.map((e) => ({
              id: e['id'].toString(),
              name: e['name'],
              coverImageUrl: e['img1v1Url']
            }))
          : [];

        const album: Album = {
          id: albumData['id'].toString(),
          name: albumData['name'],
          coverImageUrl: albumData['picUrl']
        };

        return {
          id: e['id'],
          name: e['name'],
          artists,
          millSecondsDuration: e['dt'],
          album
        };
      });
    });
  }

  searchPlayLists(pattern: string): SearchResult<string, PlayList> {
    throw new Error('Method not implemented.');
  }
  searchArtistes(pattern: string): SearchResult<String, Song> {
    throw new Error('Method not implemented.');
  }
  searchAlbums(pattern: string): SearchResult<String, Album> {
    throw new Error('Method not implemented.');
  }
  search(pattern: string): CombineSearchResult {
    throw new Error('Method not implemented.');
  }

  private generalSearch<E, Option>(
    type: CloudSearchType,
    options: Option,
    handleFunc: (data: Object) => Array<E> | undefined
  ): SearchResult<Option, ListResponsePack<E>> {
    return new SearchResult<Option, ListResponsePack<E>>(options, async (options, position) => {
      const data = {
        s: options,
        type: CloudSearchType.code(type),
        limit: position.limit,
        offset: position.offset,
        total: true,
        csrf_token: ''
      };
      const response = await this.desktopApi.post('/api/cloudsearch/get/web', data);

      try {
        const json = await response.json();
        const res = handleFunc(json as Object);
        if (!!res) {
          return new ListResponsePack(response.status, response, res);
        }
        return undefined;
      } catch {
        // FIXME: handle error
        return undefined;
      }
    });
  }
}
