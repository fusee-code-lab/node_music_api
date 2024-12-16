import { playlist_detail } from 'NeteaseCloudMusicApi';
import { get_song_info_in_list } from '../protocol';

export const song_list = async (
  id: string
) => {
  const res = await playlist_detail({
    id
  }).catch((error: Error) => {
    console.error(error);
    return null;
  });
  if (res && res.status === 200 && res.body.code === 200) {
    // @ts-ignore
    res.body.playlist.tracks = res.body.playlist.tracks.map(get_song_info_in_list);
    return res.body.playlist;
  }
  return;
}