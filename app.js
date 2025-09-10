// grabs export from search and similar js pages & imports them here
const search = require('./utils/search.js')
const similar = require('./utils/similar.js')

const movie = process.argv[2]

// all code to catch errors that may come through when finding location
if (!movie) {
    console.log('please provide a movie')
} else {
    search(movie, (error, {lat, long, location} = {}) => {
    if (error) {
        return console.log(error)
    }

    similar(lat, long, (error, forecastData) => {
        if (error) {
        return console.log(error)
    }
        console.log(location)
        console.log(forecastData)
    })
})
}

console.log(process.argv)