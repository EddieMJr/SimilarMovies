const request = require('request')

const similar = () => {
    const url = ''
    request({ url, json:true }, (error, {}) => {
        if (error) {
            callback('')
        } else {
            callback(undefined /*output for similar movies*/)
        }
    })
}

module.exports = similar