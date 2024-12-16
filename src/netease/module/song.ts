import { song_url_v1 } from "NeteaseCloudMusicApi";
import { SongQualityType } from "../../types/music";
import { get_sound_quality_type } from "../protocol";

export const song_url = async (ids: number[], quality: SongQualityType) => {
  const res = await song_url_v1({
    id: ids.join(','),
    level: get_sound_quality_type(quality) || 'exhigh'
  }).catch((error: Error) => {
    console.error(error);
    return null;
  });
  if (res && res.status === 200 && res.body.code === 200) {
    let urls: { [key: string]: string } = {};
    (res.body.data as any).forEach((item: any) => {
      urls[item.id] = item.url;
    });
    return urls;
  }
  return;
};
