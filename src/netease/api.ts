import { Response } from 'node-fetch';
import { ApiProtocol, CombineSearchResult } from '../api_protocol';
import { SearchResult, Song, PlayList, Album, Artist } from '../entities';
import { ListResponsePack } from '../models';
import { CloudSearchType } from './models';
import { NeteasyMusicApiType, NeteasyNetwork } from './network';

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

  searchPlayLists(pattern: string): SearchResult<string, ListResponsePack<PlayList>> {
    return this.generalSearch(CloudSearchType.PLAY_LIST, pattern, (data) => {
      const playlistsData = data['result']['playlists'];

      if (Array.isArray(playlistsData)) {
        return playlistsData
          .map((e) => {
            const creatorData = e['creator'];
            return {
              id: e['id'].toString(),
              name: e['name'],
              coverImageUrl: e['coverImgUrl'],
              description: e['description'],
              creator: {
                id: creatorData['userId'].toString(),
                nickname: creatorData['nickname']
              },
              songsCount: e['trackCount']
            };
          });
      }

      return undefined;
    });
  }

  searchArtistes(pattern: string): SearchResult<String, Song> {
    throw new Error('Method not implemented.');
  }

  searchAlbums(pattern: string): SearchResult<String, ListResponsePack<Album>> {
    return this.generalSearch(CloudSearchType.ALBUM, pattern, (data) => {
      const albumsData = data['result']['albums'];

      if (Array.isArray(albumsData)) {
        return albumsData.map((e) => ({
          id: e['id'].toString(),
          name: e['name'],
          coverImageUrl: e['picUrl']
        }));
      }

      return undefined;
    });
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
