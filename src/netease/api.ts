import { Response } from 'node-fetch';
import { ApiProtocol, CombineSearchResult } from '../api_protocol';
import { SearchResult, Song, PlayList, Album, Artist, SongDetail } from '../entities';
import { ListResponsePack, ResponsePack } from '../models';
import { CloudSearchType } from './models';
import { NeteasyMusicApiType, NeteasyNetwork } from './network';

export class NeteasyApi implements ApiProtocol {
  private readonly webApi = NeteasyNetwork.buildFor(NeteasyMusicApiType.WEB);

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
        return playlistsData.map((e) => {
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

  searchArtistes(pattern: string): SearchResult<String, ListResponsePack<Artist>> {
    return this.generalSearch(CloudSearchType.ARTIST, pattern, (data) => {
      const artistsData = data['result']['artists'];

      if (Array.isArray(artistsData)) {
        return artistsData.map((e) => ({
          id: e['id'].toString(),
          name: e['name'],
          coverImageUrl: e['picUrl']
        }));
      }

      return undefined;
    });
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
        csrf_token: '' // FIXME:
      };
      const response = await this.webApi.post('/api/cloudsearch/get/web', data);

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

  songDetails(id: string): Promise<ResponsePack<SongDetail>> {
    return this.batchFetchSongsDetails([id]).then((res) => {
      return new ResponsePack(
        res.status,
        res.rawBody,
        res.data.length > 0 ? res.data[0] : undefined
      );
    });
  }

  /**
   * 批量获取歌曲详情
   * @param ids 要查询的歌曲的 id 列表
   */
  private async batchFetchSongsDetails(ids: string[]): Promise<ListResponsePack<SongDetail>> {
    const data = {
      c: `[${ids.map((e) => `{ "id": "${e}" }`).join(',')}]`,
      ids: `[${ids.join(',')}]`
    };
    const response = await this.webApi.post('/api/v3/song/detail', data);

    try {
      const responseData = await response.json();
      const songsData = responseData['songs'];

      if (Array.isArray(songsData)) {
        const songsDetail: SongDetail[] = songsData.map((e) => {
          const albumData = e['al'];
          const artistData = e['ar'];
          const highQualityData = e['h'];
          const mediumQualityData = e['m'];
          const lowQualityData = e['l'];

          const album: Album = {
            id: albumData['id'].toString(),
            name: albumData['name'],
            coverImageUrl: albumData['pic_str']
          };
          const artists: Artist[] = Array.isArray(artistData)
            ? artistData.map((e) => ({
                id: e['id'].toString(),
                name: e['name'],
                coverImageUrl: e['img1v1Url']
              }))
            : [];
          const song: Song = {
            id: e['id'].toString(),
            name: e['name'],
            artists: artists,
            millSecondsDuration: e['dt'],
            album: album
          };

          return {
            song,
            quality: {
              high: !!highQualityData
                ? {
                    bitRate: BigInt(highQualityData['br']),
                    bitSize: BigInt(highQualityData['size'])
                  }
                : highQualityData,
              medium: !!mediumQualityData
                ? {
                    bitRate: BigInt(mediumQualityData['br']),
                    bitSize: BigInt(mediumQualityData['size'])
                  }
                : mediumQualityData,
              low: !!lowQualityData
                ? {
                    bitRate: BigInt(lowQualityData['br']),
                    bitSize: BigInt(lowQualityData['size'])
                  }
                : lowQualityData
            }
          };
        });
        return new ListResponsePack(response.status, response, songsDetail);
      }
      return new ListResponsePack(response.status, response, []);
    } catch (err) {
      // FIXME: handle this error
      console.error(err);
      return new ListResponsePack(response.status, response, []);
    }
  }
}
