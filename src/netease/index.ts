import NeteaseCloudMusicApi from "NeteaseCloudMusicApi";
import { search } from "./module/search"
import { song_url } from "./module/song"
import { playlist_detail, playlist_song_list } from "./module/playlist"
import { lyric } from "./module/lyric";

export const netease = {
  ...NeteaseCloudMusicApi,
  search,
  song_url,
  playlist_detail,
  playlist_song_list,
  lyric
}