const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })
const express = require('express')
const search = require('./utils/search')
const similar = require('./utils/sim')

const app = express()

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/search', (req, res) => {
  const title = req.query.title
  if (!title) {
    return res.send({ error: 'Please input a movie title' })
  }

  search(title, (error, movie) => {
    if (error) {
      return res.send({ error })
    }

    res.send({ movie })
  })
})

app.get('/similar', (req, res) => {
  const movieId = req.query.id
  if (!movieId) {
    return res.send({ error: 'We didnt get a movie ID from the movie you inputted' })
  }

  similar(movieId, (error, similarMovies) => {
    if (error) {
      return res.send({ error })
    }

    console.log('Similar Movies: ', similarMovies)
    res.send({ similarMovies })
  })
})


app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'))
})

app.listen(3000, () => {
     console.log('The server is up on port 3000.')
})