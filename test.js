const { NeteasyApi } = require("./dist/main");

const api = new NeteasyApi();
api.searchAlbums("林俊杰").limit(2).next().then(res => {
  console.log(JSON.stringify(res, null, 2));
});