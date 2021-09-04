import { SearchResult } from "./models";

/**
 * 通用 Api 协议，要添加新的平台支持，需要实现该 interface,
 */
export interface ApiProtocol {

  constructor();

  // 🔍 搜索功能

  /**
   * 根据搜索关键词搜索歌曲
   * @param pattern 搜索关键词
   */
  searchSongs(pattern: string);
  
  /**
   * 根据搜索关键词搜索播放列表
   * @param pattern 搜索关键词
   */
  searchPlayLists(pattern: string);

  /**
   * 根据给定关键词搜索歌词
   * @param pattern 搜索关键词
   */
  searchArtistes(pattern: string);

  /**
   * 根据给定关键词搜索专辑
   * @param pattern 搜索关键词
   */
  searchAlbums(pattern: string);

  /**
   * 根据给定关键词混合搜索，包括 音乐、播放列表、歌手、专辑
   * @param pattern 搜索关键词
   */
  search(pattern: string);

}