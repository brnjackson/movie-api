const movies = require('../movies')

const serverSetup = (request, response) => {
  return response.send('Hello World')
}
const returnAll = (request, response) => {
  return response.send({ movies })
}
const getMovieTitle = (request, response) => {
  const movieTitle = movies.filter(movie => movie.title.toLowerCase().includes(request.params.title.toLowerCase()))

  return response.send(movieTitle)
}
const getMovieDirectors = (request, response) => {
  const moviesDirectors = movies.filter(movie => { return movie.directors.some(director => {
    return director.toLowerCase().includes(request.params.directors.toLowerCase())
  })
  })

  return response.send(moviesDirectors)
}
const postRequest = (request, response) => {
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
}

module.exports = {
  serverSetup, returnAll, getMovieTitle, getMovieDirectors, postRequest
}
