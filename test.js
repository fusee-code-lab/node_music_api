const { NeteasyApi } = require('./dist/main');

const api = new NeteasyApi();
api.songLyrics('1470115202').then((res) => {
  console.log(JSON.stringify(res, null, 2))
});
