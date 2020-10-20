import express, { Request, Response } from 'express'
import logger from 'morgan'

const App = express()

// Shows request log on terminal
// https://github.com/expressjs/morgan
App.use(logger('combined'))

// Parses incoming requests with JSON payloads
// http://expressjs.com/es/api.html#express.json
App.use(express.json())

// Parses incoming requests with urlencoded payloads
// http://expressjs.com/es/api.html#express.urlencoded
App.use(express.urlencoded({ extended: false }))

App.get('/api/memes', function (req, res) {
  res.send([]).sendStatus(200)
})

export default App
