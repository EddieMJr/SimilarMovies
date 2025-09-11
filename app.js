// grabs export from search and similar js pages and imports them here
const search = require('./utils/search')
const similar = require('./utils/sim')

const title = process.argv[2]

// all code to catch errors that may come through when finding movies
if (!title) {
  console.log('Please provide a movie title')
} else {

  search(title, (error, { movieId, title: movieTitle } = {}) => {
    if (error) {
      return console.log('Search error:', error)
    }

    similar(movieId, (error, similarMovies) => {
      if (error) {
        return console.log('Similar movies error:', error)
      }

      console.log(`Similar movies to "${movieTitle}":`)
      similarMovies.forEach(movie => {
        console.log(`- ${movie.title} (${movie.release_date})`)
      })
    })
  })
}

console.log(process.argv)