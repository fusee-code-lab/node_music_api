const { NeteasyApi } = require('.');

const api = new NeteasyApi();

const res = api
  .searchAlbums('林俊杰')
  .limit(1)
  .nextPage()
  .then((list) => {
    const album = list.data[0];
    console.log(`id: ${album.id} name: ${album.name}`);

    api.albumDetails(album.id).then((detail) => {
      console.log(detail.data.description);
    });
  });
