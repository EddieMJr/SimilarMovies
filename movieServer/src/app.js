const path = require('path')
const express = require('express')
const hbs = require('hbs')
const search = require('./utils/search')
const similar = require('./utils/search')

const app = express()

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
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

app.get(/.*/, (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found!',
        title: '404',
        name: 'Eddie Millsaps Jr'
    })
})

app.listen(3000, () => {
    console.log('The server is up on port 3000.')
})