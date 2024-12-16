import { set_cookie } from "./protocol"
import { search } from "./module/search"
import { song_url } from "./module/song"
import { song_list } from "./module/song_list"

export const qq = {
  search,
  song_url,
  song_list,
  set_cookie
}