const request = require('request')

module.exports = (id, callback) => {
  //USE YOUR OWN API KEY FOR TMDB BELOW
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`;

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
