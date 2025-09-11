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
    .then(json => {
      if (json.results && json.results.length > 0) {
        callback(null, json.results[1].title)
      } else {
        callback ('Movies Not Found.')
      }
    })
    .catch(err => console.error(err));
}

module.exports = similar