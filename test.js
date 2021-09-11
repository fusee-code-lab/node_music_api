const { NeteasyApi } = require('./dist/main');

const api = new NeteasyApi();
api.songUrl('1470115202').then((res) => {
  console.log(res.data.toString())
});
