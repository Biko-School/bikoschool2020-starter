import express from 'express'
import logger from 'morgan'
import { routes } from './routes'

export const app = express()

// Show request log on terminal
// https://github.com/expressjs/morgan
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('combined'))
}

// Parses incoming requests with JSON payloads
// http://expressjs.com/es/api.html#express.json
app.use(express.json())

// Parses incoming requests with urlencoded payloads
// http://expressjs.com/es/api.html#express.urlencoded
app.use(express.urlencoded({ extended: false }))

app.use('/api', routes)
