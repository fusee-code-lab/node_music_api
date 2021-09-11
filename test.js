const { NeteasyApi } = require('./dist/main');

const api = new NeteasyApi();
api.songDetails('29850685').then((res) => {
  console.log(res)
});
