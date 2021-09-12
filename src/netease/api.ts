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
  VendorUser,
  AlbumDetail,
  buildArtists,
  buildAlbum,
  buildSong,
  buildAlbums,
  buildVendorUser,
  buildPlayList,
  buildSongQuality
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
        const artists = buildArtists(artistsData);
        const album = buildAlbum(albumData);

        return buildSong(e, artists ?? [], album);
      });
    });
  }

  searchPlayLists(pattern: string): SearchResult<string, ListResponsePack<PlayList>> {
    return this.generalSearch(CloudSearchType.PLAY_LIST, pattern, (data) => {
      const playlistsData = data['result']['playlists'];

      if (Array.isArray(playlistsData)) {
        return playlistsData.map((e) => {
          const creatorData = e['creator'];

          const creator = buildVendorUser(creatorData);
          return buildPlayList(e, creator);
        });
      }

      return undefined;
    });
  }

  searchArtistes(pattern: string): SearchResult<string, ListResponsePack<Artist>> {
    return this.generalSearch(CloudSearchType.ARTIST, pattern, (data) => {
      const artistsData = data['result']['artists'];
      return buildArtists(artistsData);
    });
  }

  searchAlbums(pattern: string): SearchResult<string, ListResponsePack<Album>> {
    return this.generalSearch(CloudSearchType.ALBUM, pattern, (data) => {
      const albumsData = data['result']['albums'];
      return buildAlbums(albumsData);
    });
  }

  search(pattern: string): CombineSearchResult {
    return new CombineSearchResult(
      this.searchSongs(pattern),
      this.searchPlayLists(pattern),
      this.searchArtistes(pattern),
      this.searchAlbums(pattern),
    );
  }

  private generalSearch<E, Option>(
    type: CloudSearchType,
    options: Option,
    handleFunc: (data: any) => Array<E> | undefined
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
        const res = handleFunc(json);
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

          const album = buildAlbum(albumData);
          const artists = buildArtists(artistData);
          const song = buildSong(e, artists ?? [], album);

          return {
            song,
            quality: buildSongQuality(highQualityData, mediumQualityData, lowQualityData)
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
      return new ResponsePack<URL>(response.status, response, undefined);
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
      // TODO: 还有个 klyric 不知道干嘛的 测试 url http://localhost:3000/lyric?id=33894312
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
    } catch (err) {
      // FIXME: handle this error
      console.error(err);
      return new ResponsePack<SongLyrics>(response.status, response, undefined);
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

      const creator = buildVendorUser(creatorData);
      const playList = buildPlayList(playListData, creator);

      const playListDetail: PlayListDetail = {
        playList: playList,
        createTime: new Date(playListData['createTime']),
        updateTime: new Date(playListData['updateTime']),
        tags: tagsData.map((e) => ({ name: e })),
        trackIds: trackIdsData.map((e: any) => e['id'].toString())
      };

      return new ResponsePack(response.status, response, playListDetail);
    } catch (err) {
      // FIXME: handle this error
      console.error(err);
      return new ResponsePack<PlayListDetail>(response.status, response, undefined);
    }
  }

  async albumDetails(id: string): Promise<ResponsePack<AlbumDetail>> {
    const response = await this.webApi.post(`/api/v1/album/${id}`);

    try {
      const data = await response.json();
      const albumData = data['album'];
      const artistsData = ensureArray(data['album']);
      const songsData = ensureArray(data['songs']);

      const album = buildAlbum(albumData);
      const artists = buildArtists(artistsData) ?? [];
      const songs: Song[] = songsData.map((e) => buildSong(e, artists, album));
      
      const detail: AlbumDetail = {
        album: album,
        artists: artists,
        description: albumData['description'],
        publishDate: new Date(albumData['publishTime']),
        songs: songs
      };

      return new ResponsePack(response.status, response, detail);
    } catch (err) {
      // FIXME: handle this error
      console.error(err);
      return new ResponsePack<AlbumDetail>(response.status, response, undefined);
    }
  }
}
