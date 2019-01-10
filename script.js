function getLyrics(artist, title) {
    console.log(artist, title)
    axios({
      method: 'POST', 
      url: 'http://localhost:3000/lyrics',
      data: {
        artist: artist, 
        title: title
      }
    })
    .then(({ data }) => {
      console.log(data);
      $('#lyrics').html(data.lyrics);
    })
    .catch((err) => {
      console.log(err);
    })
}