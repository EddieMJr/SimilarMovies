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
                const movieData = data.results[0]
                const posterUrl = movieData.poster_path
                const movieName = movieData.title

                messOne.textContent = `Movie Title: ${movieName}`
                messTwo.textContent = `Movies similar to ${movieName}:`

                movie.insertAdjacentHTML('beforeend', `
                    <div>
                        <img src="${posterUrl}" id="moviePoster" alt="${movieName}">
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
                                const simPoster = sim.poster_path


                                movieSim.insertAdjacentHTML('beforeend', `
                                    <div class="sim-card">
                                        <img src="${simPoster}" alt="${sim.title}">
                                        <p><b>${sim.title}</b></p>
                                    </div>
                                `)
                            })
                        }
                    })
                })
            }
        })
    })
})