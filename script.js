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
  $('#topchart').empty()
  let i = 0
  axios({
    method: 'GET',
    url: 'http://localhost:3000/topcharts'
  })
  .then(({data}) =>  {
    data.track.forEach(track => {
      i++
       $('#topchart').append(`
          <img class="card-img-top" src="${track.image[2]["#text"]}" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">  ${track.name} </h5>
                <h6 class="card-subtitle mb-2 text-muted"><a href="${track.artist.url}">${track.artist.name}</a></h6>
                <a href="${track.url}" class="card-link ml-5">View On Last FM</a>
                <p class="card-text">Rank : ${i}</p>
           </div>
        `)
    })
    console.log(data.track);
  })
  .catch(err => {
    console.log(err);
  })
}

function getTopChartRegion(country) {
  $('#topchart').empty()
  let i = 0
  axios({
    method: 'GET',
    url: `http://localhost:3000/topcharts/${country}`
  })
  .then(({data}) =>  {
    data.track.forEach(track => {
      i++
       $('#topchart').append(`
          <img class="card-img-top" src="${track.image[2]["#text"]}" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">  ${track.name} </h5>
                <h6 class="card-subtitle mb-2 text-muted"><a href="${track.artist.url}">${track.artist.name}</a></h6>
                <a href="${track.url}" class="card-link ml-5">View On Last FM</a>
                <p class="card-text">Rank : ${i}</p>
           </div>
        `)
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

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  axios({
    method: 'POST',
    url: 'http://localhost:3000/users/signin',
    data: {
      google_access_token: id_token
    }
  })
  .then(({ data }) => {
    console.log(data)
    localStorage.setItem('token', data)
    isLogin()
  })
  .catch((err) => {
    console.log(err)
  })
}

function isLogin() {
  let token = localStorage.getItem('token');
  if (token) {
    $('#g-signin').hide()
    $('#g-signout').show()
    $('#content').show()
  } else {
    $('#g-signin').show()
    $('#g-signout').hide()
    $('#content').hide()
  }
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    localStorage.clear();
    isLogin();
<<<<<<< HEAD
  }); 
=======
  });
>>>>>>> 253b55402187479e00de6cc3a6aea3cd320e41d5
}