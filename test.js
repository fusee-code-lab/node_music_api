const { qq, netease } = require('./dist/index.js')

// qq.search('ff14', 10, 1, 1)
//   .then(result => {
//     console.log(result);

//   })
// 2611153424

netease.song_url([2611153424, 1445247636])
  .then(result => {
    console.log(result);
  })

// netease.search('Shadowbringers', 1, 1, 1)
//   .then(result => {
//     console.log(result);
//   })

// qq.song_list(7452914334)
//   .then(res => {
//     console.log(res);
//   })

// 003V3v3l1tqUbx

// qq.lyric('0002JYFJ3vHIoN')
//   .then(result => {
//     console.log(result);
//   })