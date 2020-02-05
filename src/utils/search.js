const request = require('request')

module.exports = (movie, page = 1, callback) => {
  // USE YOUR OWN API KEY FOR TMDB BELOW
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${encodeURIComponent(movie)}&page=${page}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to movie database.')
    } else if (body.results.length === 0) {
      callback('Unable to find results. Try another search.', undefined)
    } else {
      callback(undefined, body)
    }
  })
}
