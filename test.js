const { NeteasyApi } = require("./dist/main");

const api = new NeteasyApi();
api.searchPlayLists("夏天").limit(2).next().then(res => {
  console.log(JSON.stringify(res, null, 2));
});