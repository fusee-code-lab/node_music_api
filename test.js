const { NeteasyApi } = require('.');

async function main() {
  const api = new NeteasyApi();
  const res = await api.search('可惜没如果').songs.nextPage();
  console.log(res.data.map(i => i.name));
}

main().then()