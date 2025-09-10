// const request = require('request')

// //
// const search = (lat, long, callback) => {
//     // grabs weatherstack info and inputs latitude and longitude into link
//     const url = 'https://api.themoviedb.org/3/search/movie?api_key=48fbdda55a09cdde802a29543e011a7e&query=' + title +'&language=en-US&page=1'
//     search({ url, json:true}, (error, {body}) => {
//         if (error) {
//             callback('Unable to connect to weather services!', undefined)
//         } else if (body.error) {
//             callback('Unable to find location.', undefined)
//             // if no errors, show this message
//         } else {
//             callback(undefined, body.current.weather_descriptions[0] + ' currently. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. There is a ' + body.current.precip + '% chance of rain.')
//         }
//     })
// }

// // allows this file to be imported by other files
// module.exports = search

const movieId = '4488'

const similar = (movieId, callback) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGZiZGRhNTVhMDljZGRlODAyYTI5NTQzZTAxMWE3ZSIsIm5iZiI6MTc1NzM0OTQyMi40NjMsInN1YiI6IjY4YmYwNjJlNmViZTk4YzcxZTRlNjJkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A2yhFTqVfPevIURJaTJPquJHaZ7TWF6N-pePnFtqIEE'
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json.results[1].title))
    .catch(err => console.error(err));
}

module.exports = similar