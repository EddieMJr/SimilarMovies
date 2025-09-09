const request = require('request')

const search = () => {
    const url = ''
    request({ url, json:true }, (error, {}) => {
        if (error) {
            callback('')
        } else {
            callback(undefined /*output for movie search*/)
        }
    })
}

module.exports = search