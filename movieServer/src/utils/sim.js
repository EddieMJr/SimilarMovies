require('dotenv').config()

const similar = (movieId, callback) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.API_TOKEN
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => {
      if (json.results && json.results.length > 0) {
        callback(null, json.results.slice(0, 5))
      } else {
        callback ('Movies Not Found.')
      }
    })
    .catch(err => console.error(err));
}

module.exports = similar