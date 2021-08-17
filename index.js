const express = require('express')
const app = express()
const {
  serverSetup, returnAll, getMovieTitle, getMovieDirectors, postRequest
} = require('./controllers/movies')

app.get('/', serverSetup)

app.use(express.json())
app.get('/movies', returnAll)

app.get('/movies/:title', getMovieTitle)

app.get('/movies/director/:directors', getMovieDirectors)

app.post('/movies', postRequest)

app.listen(1337, () => {
  console.log('my brain has too many tabs open') // eslint-disable-line no-console
})
