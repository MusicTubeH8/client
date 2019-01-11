function getLyrics(artist, title) {
    axios({
      method: 'POST', 
      url: 'http://localhost:3000/lyrics',
      data: {
        artist: artist, 
        title: title
      }
    })
    .then(({ data }) => {
      $('#lyrics').html("")
      let lyrics = data.lyrics.split("\n")
      lyrics.forEach(item => {
        $('#lyrics').append(`<p>${item}</p>`);
      })
    })
    .catch((err) => {
      $('#lyrics').html("Lyric not found");
    })
}

function getTopChart() {
  let i = 0
  axios({
    method: 'GET',
    url: 'http://localhost:3000/topchart'
  })
  .then(({data}) =>  {
    data.track.forEach(track => {
      i++
      $('#topchart').append(`
        <tr>
          <th scope="row">${i}</th>
          <td>${track.artist.name}</td>
          <td>${track.name}</td>
        </tr>`)
    })
  })
  .catch(err => {
    console.log(err);
  })
}

function getVideo(find) {
  axios({
    method: "GET",
    url: `http://localhost:3000/youtube/${find}`
  })
  .then(response => {
    response.data.items.forEach(element => {
      $("#video").html(`<iframe id="existing-iframe-example"
        width="640" height="360"
        src="https://www.youtube.com/embed/${element.id.videoId}?enablejsapi=1"
        frameborder="0"
        style="border: solid 4px #37474F"></iframe>`)
    });
  })
  .catch((err) => {
    console.log(err);
  })
}