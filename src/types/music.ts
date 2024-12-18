export type MusicType = 'netease' | 'qq';

export type MusicSearchType = 'single' | 'album' | 'playlist' | 'artist' | 'mv' | 'user' | 'lyric' | 'dj';

// standard => 标准,
// higher => 较高, 
// exhigh=>极高, 
// lossless=>无损, 
// hires=>Hi-Res, 
// jyeffect => 高清环绕声,
// sky => 沉浸环绕声, 
// dolby => 杜比全景声, 
// jymaster => 超清母带
export type SongQualityType = 'standard' | 'higher' | 'exhigh' | 'lossless' | 'hires' | 'jyeffect' | 'sky' | 'dolby' | 'jymaster';

export interface SongItem {
  album: {
    id: string | number,
    mid: string,
    name: string
  }
  artists: { id: string | number, name: string }[],
  id: string | number,
  link: string,
  song_id: string | number,
  song_name: string,
  song_desc: string,
  song_time: number,
  song_img_url: string,
  cp: boolean,
  dl: boolean,
  quality: {
    192: boolean,
    320: boolean,
    999: boolean,
  },
  mv: string | number,
  [key: string]: any
}

