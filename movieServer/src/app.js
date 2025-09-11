const path = require('path')
const express = require('express')
const hbs = require('hbs')
const search = require('./utils/search')
const similar = require('./utils/sim')

const app = express()

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views movies
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Similar Films',
        name: 'Eddie Millsaps Jr'
    })
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

    res.send({ similarMovies })
  })
})


app.use((req, res) => {
    res.status(404).render('404', {
        errorMessage: 'Page not found!',
        title: '404',
        name: 'Eddie Millsaps Jr'
    })
})

app.listen(3000, () => {
    console.log('The server is up on port 3000.')
})