console.log('Client side js file is loaded!')

const movieForm = document.querySelector('form')
const search = document.querySelector('input')
const messOne = document.querySelector('#errorMess')
const messTwo = document.querySelector('#movies')
const movie = document.querySelector('#movieInput')
const movieSim = document.querySelector('#simGrid')

// allows movie for input to be displayed after pressing the button
movieForm.addEventListener('submit', (e) => {
    // stops page from resetting instantly after button press (form submition)
    e.preventDefault()

    const title = search.value

    // Shows loading message on index.hbs after button press
    messOne.textContent = 'Loading...'
    messTwo.textContent = ''
    movie.innerHTML = ''
    movieSim.innerHTML = ''

    // fetch the movie that the user inputted
    fetch('/search?title=' + encodeURIComponent(title)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messOne.textContent = data.error
            } else {
                const movieData = data.movie
                const posterUrl = `https://image.tmdb.org/t/p/w400/${movieData.poster_path}`
                const movieName = movieData.title
                const desc = movieData.overview

                messOne.innerHTML = `Movie Title: <b>${movieName}</b>`
                messTwo.innerHTML = `Movies similar to <b>${movieName}</b>:`

                movie.insertAdjacentHTML('beforeend', `
                    <div>
                        <img src="${posterUrl}" id="moviePoster" alt="${movieName}">
                        <p><b>Overview</b>: ${desc}</p>
                    </div>
                `)

                // fetch similar movies
                fetch('/similar?id=' + movieData.id).then((response) => {
                    response.json().then((simData) => {
                        if (simData.error) {
                            movieSim.textContent = simData.error
                        } else {
                            const similarMovies = simData.similarMovies
                            similarMovies.forEach(sim => {
                                const simPosterUrl = sim.poster_path 
                                    ? `https://image.tmdb.org/t/p/w185/${sim.poster_path}`
                                    : 'https://ih1.redbubble.net/image.533910704.5853/raf,185x185,075,t,fafafa:ca443f4786.u3.jpg'


                                movieSim.insertAdjacentHTML('beforeend', `
                                    <div class="simMovie">
                                        <img src="${simPosterUrl}" alt="${sim.title}">
                                        <p><b>${sim.title}</b></p>
                                        <p id='topOverview'>${sim.overview}</p>
                                    </div>`)
                            })
                        }
                    })
                })
            }
        })
    })
})