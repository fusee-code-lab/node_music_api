import { URL } from 'url';
import { Album, AlbumDetail, Artist, PlayList, PlayListDetail, Song, SongDetail, SongLyrics } from './entities';
import { ListResponsePack, ResponsePack, SearchResult } from './models';

export class CombineSearchResult {
  constructor(
    readonly songs: SearchResult<string, ListResponsePack<Song>>,
    readonly playlists: SearchResult<string, ListResponsePack<PlayList>>,
    readonly artists: SearchResult<string, ListResponsePack<Artist>>,
    readonly albums: SearchResult<string, ListResponsePack<Album>>
  ) {}
}

/**
 * 通用 Api 协议，要添加新的平台支持，需要实现该 interface,
 */
export interface ApiProtocol {
  // 🔍 搜索功能

  /**
   * 根据搜索关键词搜索歌曲
   * @param pattern 搜索关键词
   */
  searchSongs(pattern: string): SearchResult<string, ListResponsePack<Song>>;

  /**
   * 根据搜索关键词搜索播放列表
   * @param pattern 搜索关键词
   */
  searchPlayLists(pattern: string): SearchResult<string, ListResponsePack<PlayList>>;

  /**
   * 根据给定关键词搜索歌词
   * @param pattern 搜索关键词
   */
  searchArtistes(pattern: string): SearchResult<string, ListResponsePack<Artist>>;

  /**
   * 根据给定关键词搜索专辑
   * @param pattern 搜索关键词
   */
  searchAlbums(pattern: string): SearchResult<string, ListResponsePack<Album>>;

  /**
   * 根据给定关键词混合搜索，包括 音乐、播放列表、歌手、专辑
   * @param pattern 搜索关键词
   */
  search(pattern: string): CombineSearchResult;


  // 📒 详情
  
  playListDetails(id: string): Promise<ResponsePack<PlayListDetail>>;

  songDetails(id: string): Promise<ResponsePack<SongDetail>>;

  albumDetails(id: string): Promise<ResponsePack<AlbumDetail>>;

  songUrl(id: string): Promise<ResponsePack<URL>>;

  songLyrics(id: string): Promise<ResponsePack<SongLyrics>>;
}
