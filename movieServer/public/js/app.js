console.log('Client side js file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messOne = document.querySelector('#errorMess')
const messTwo = document.querySelector('#location')

// allows weather for location input to be displayed after pressing the button
weatherForm.addEventListener('submit', (e) => {
    // stops page from resetting instantly after button press (form submition)
    e.preventDefault()

    const location = search.value

    // Shows loading message on index.hbs after button press
    messOne.textContent = 'loading...'
    messTwo.textContent = ''

    // grabs information from weather link and adding new location
    fetch('http://localhost:3000/weather?address=' + location).then ((response) => {
    response.json().then((data) => {
        // if input isnt a location, show error
        if (data.error) {
            messOne.textContent = data.error
            // if input is a location, show forecast and location
        } else {
            messOne.textContent = data.location
            messTwo.textContent = data.forecast
        }
    })
})
})