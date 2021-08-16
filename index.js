const express = require('express')
const app = express()
const movies = require('./movies')

app.get('/', (request, response) => {
  return response.send('Hello World')
})

app.use(express.json())
app.get('/movies', (request, response) => {
  return response.send({ movies })
})

app.get('/movies/:title', (request, response) => {
  // eslint-disable-next-line max-len
  const movieTitle = movies.filter(movie => movie.title.toLowerCase().includes(request.params.title.toLowerCase()))

  return response.send(movieTitle)
})

app.get('/movies/director/:directors', (request, response) => {
  const moviesDirectors = movies.filter(movie => { return movie.directors.some(director => {
    return director.toLowerCase().includes(request.params.directors.toLowerCase())
  })
  })

  return response.send(moviesDirectors)
})

app.get('/movies/:titleOrDirector', (req, res) => {
  let checkStr = req.params.titleOrDirector.toLowerCase()

  const moviesFiltered = movies.filter((movie) =>
  movie.title.toLowerCase().includes(checkStr) || movie.directors.some((director) =>
  director.toLowerCase().includes(checkStr)))

  if (!moviesFiltered.length) {
    return res.sendStatus(404)
  }

  return res.send(moviesFiltered)
})


app.post('/movies', (request, response) => {
  // eslint-disable-next-line no-console
  console.log(request.body)
  const {
    title, directors, releaseDate, rating, runTime, genres
  } = request.body

  // check response body for all fields - if missing fields, return error 400
  if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
    return response.status(400).send('missing fields')
  }

  const newMovieObject = {
    title: title,
    directors: directors,
    releaseDate: releaseDate,
    rating: rating,
    runTime: runTime,
    genres: genres
  }
  // add new team object to the teams array

  movies.push(newMovieObject)
  // respond with the newly created team
  response.send(newMovieObject)
})

app.listen(1337, () => {
  console.log('my brain has too many tabs open') // eslint-disable-line no-console
})
