import NeteaseCloudMusicApi from "NeteaseCloudMusicApi";
import { search } from "./module/search"
import { song_url } from "./module/song"
import { song_list } from "./module/song_list"
import { lyric } from "./module/lyric";

export const netease = {
  ...NeteaseCloudMusicApi,
  search,
  song_url,
  song_list,
  lyric
}