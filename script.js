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

function getTopChart() {
  let i = 0
  axios({
    method: 'GET',
    url: 'http://localhost:3000/topcharts'
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
    console.log(data.track);
  })
  .catch(err => {
    console.log(err);
    
  })
}