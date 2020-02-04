const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Custom Utils
const search = require('./utils/search')
const idSearch = require('./utils/id-search')

// Express
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
hbs.registerHelper('choose', (a, b) => a ? a : b)

// Static public directory to serve
app.use(express.static(publicDirectoryPath))

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Gusterson Movie Search'
  })
})

app.get('/movie', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    })
  }
  search(req.query.search, req.query.page, (error, movieData) => {
    if (error) {
      return res.send({ error })
    }
    res.send(movieData)
  })
})

app.get('/movie-info', (req, res) => {
  if (!req.query.id) {
    return res.render('movie', {
      error: 'No movie ID provided.'
    })
  }

  if (req.query.id) {
    idSearch(req.query.id, (error, data) => {
      if (error) {
        res.render('movie-error', {
          error
        })
      } else {
        res.render('movie', {
          data
        })
      }
    })
  }
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error',
    errorMessage: 'Page not found.'
  })
})

// Listen for server requests
app.listen(port, () => {
  console.log('Listening on port: ' + port + '.')
})