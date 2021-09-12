const { NeteasyApi } = require('.');

const api = new NeteasyApi();

const res = api
  .searchPlayLists('恋爱')
  .limit(1)
  .nextPage()
  .then((list) => {
    const playList = list.data[0];
    console.log(`id: ${playList.id} name: ${playList.name}`);

    api.playListDetails(playList.id).then((detail) => {
      console.log(JSON.stringify(detail, null, 2));
    });
  });
