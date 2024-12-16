export enum MusicType {
  Netease = 'netease',
  QQ = 'qq'
}

export enum MusicSearchType {
  single = 1, // 单曲
  album = 2, // 专辑
  artist = 3, // 歌手
  playlist = 4, // 歌单
  user = 5, // 用户
  mv = 6, // mv
  lyric = 7, // 歌词
  dj = 8 // 电台
}

// standard => 标准,
// higher => 较高, 
// exhigh=>极高, 
// lossless=>无损, 
// hires=>Hi-Res, 
// jyeffect => 高清环绕声,
// sky => 沉浸环绕声, 
// dolby => 杜比全景声, 
// jymaster => 超清母带

export enum SongQualityType {
  standard = 'standard',
  exhigh = 'exhigh',
  lossless = 'lossless',
  hires = 'hires',
  jyeffect = 'jyeffect',
  jymaster = 'jymaster',
  sky = 'sky'
}

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

