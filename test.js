const { qq, netease } = require('./dist/index.js')

// netease.search('Shadowbringers', 2, 1, 4)
//   .then(result => {
//     console.log(result);

//   })
// 2611153424

// netease.song_url([2611153424, 1445247636])
//   .then(result => {
//     console.log(result);
//   })

// qq.search('Shadowbringers', 1, 1, 1)
//   .then(result => {
//     console.log(result.list[0]);
//   })

netease.song_list(10157118407)
  .then(res => {
    console.log(res.tracks);
  })