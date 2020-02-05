const request = require('request')

module.exports = (id, callback) => {
  // YOUR OWN TMDB API KEY SHOULD REPLACE API_KEY
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to movie database.')
    } else if (body.status_code === 34) {
      callback('Unable to find results. Try another id number.', undefined)
    } else {
      callback(undefined, body)
    }
  })
}
