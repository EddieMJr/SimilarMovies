// const request = require('request')

// const search = (address, callback) => {
//     // makes geocode accurate for accurate weather info
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWRkaWVtanIiLCJhIjoiY21ldDh1eDFuMGJiOTJtcTNvYXNyNGdtbCJ9.B4WyVNxox-HHLZQH3VYMXw'

//     request({ url, json:true}, (error, {body}) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined)
//         } else if (body.features.length === 0) {
//             callback('Unable to find location. Try another search.', undefined)
//         } else {
//             callback(undefined, {
//                 lat: body.features[0].center[1],
//                 long: body.features[0].center[0],
//                 location: body.features[0].place_name
//             })
//         }
//     })
// }

// // allows this file to be imported by other files
// module.exports = search

// const movieTitle = document.getElementById('')

const search = (title, callback) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGZiZGRhNTVhMDljZGRlODAyYTI5NTQzZTAxMWE3ZSIsIm5iZiI6MTc1NzM0OTQyMi40NjMsInN1YiI6IjY4YmYwNjJlNmViZTk4YzcxZTRlNjJkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A2yhFTqVfPevIURJaTJPquJHaZ7TWF6N-pePnFtqIEE'
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json.results[0].id))
    .catch(err => console.error(err));
}

module.exports = search