import { Response } from 'node-fetch';
import { URL } from 'url';
import { ApiProtocol, CombineSearchResult } from '../api_protocol';
import {
  Song,
  PlayList,
  Album,
  Artist,
  SongDetail,
  SongLyrics,
  SongLyricsItem,
  PlayListDetail,
  VendorUser
} from '../entities';
import { ListResponsePack, ResponsePack, SearchResult } from '../models';
import { ensureArray } from '../utils';
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

  // FIXME: typeof biteRate
  // TODO: including br and size in return type.
  // return {
  //   status: true,
  //   data: {
  //     url: data[0].url,
  //     br: data[0].br,
  //     size: data[0].size,
  //   },
  // };
  async songUrl(id: string, bitRate: BigInt = BigInt(192_000)): Promise<ResponsePack<URL>> {
    const params = {
      ids: [id],
      br: bitRate,
      csrf_token: ''
    };
    const response = await this.webApi.post('/api/song/enhance/player/url', params);

    try {
      const data = await response.json();
      const urlData = data['data'];

      let url: URL | undefined;

      if (Array.isArray(urlData) && urlData.length > 0) {
        url = !!urlData[0]['url'] ? new URL(urlData[0]['url']) : undefined;
      }

      return new ResponsePack(response.status, response, url);
    } catch (err) {
      // FIXME: handle this error
      console.error(err);
      return new ResponsePack(response.status, response, undefined);
    }
  }

  async songLyrics(id: string): Promise<ResponsePack<SongLyrics>> {
    const data = {
      id: id,
      lv: -1,
      kv: -1,
      tv: -1
    };
    const response = await this.webApi.post('/api/song/lyric', data);

    try {
      const lyricsData = await response.json();
      const originalLyricsData = lyricsData['lrc'];
      // TODO 还有个 klyric 不知道干嘛的 测试 url http://localhost:3000/lyric?id=33894312
      const translatedLyricsData = lyricsData['tlyric'];

      const originalLyrics: SongLyricsItem | undefined =
        originalLyricsData['lyric'] === ''
          ? undefined
          : {
              strRaw: originalLyricsData['lyric'],
              content: [] // TODO: 歌词解析
            };
      const translatedLyrics: SongLyricsItem | undefined =
        translatedLyricsData['lyric'] == ''
          ? undefined
          : {
              strRaw: translatedLyricsData['lyric'].toString(),
              content: [] // TODO: 歌词解析
            };

      const lyrics: SongLyrics = {
        original: originalLyrics,
        translated: translatedLyrics
      };

      return new ResponsePack(response.status, response, lyrics);
      // return new ResponsePack(response.status, response, url);
    } catch (err) {
      // FIXME: handle this error
      console.error(err);
      return new ResponsePack(response.status, response, undefined);
    }
  }

  async playListDetails(id: string): Promise<ResponsePack<PlayListDetail>> {
    const data = {
      id: id,
      n: 100000,
      s: 0 // 歌单最近的 s 个收藏者,默认为8
    };
    const response = await this.webApi.post('/api/v6/playlist/detail', data);

    try {
      const data = await response.json();
      const playListData = data['playlist'];
      const trackIdsData = ensureArray(playListData['trackIds']);
      const creatorData = playListData['creator'];
      const tagsData = ensureArray<string>(playListData['tags']);

      const creator: VendorUser = {
        id: creatorData['userId'].toString(),
        nickname: creatorData['nickname']
      };
      const playList: PlayList = {
        id: playListData['id'].toString(),
        name: playListData['name'],
        coverImageUrl: playListData['coverImgUrl'],
        description: playListData['description'],
        creator: creator,
        songsCount: playListData['trackCount']
      };
      const playListDetail: PlayListDetail = {
        playList: playList,
        createTime: new Date(playListData['createTime']),
        updateTime: new Date(playListData['updateTime']),
        tags: tagsData.map((e) => ({ name: e })),
        trackIds: trackIdsData.map((e) => e['id'].toString())
      };

      return new ResponsePack(response.status, response, playListDetail);
    } catch (err) {
      // FIXME: handle this error
      console.error(err);
      return new ResponsePack(response.status, response, undefined);
    }
  }
}
