import express, { Request, Response } from 'express'
import logger from 'morgan'
import { createRouter } from './router'

export const createApp = (db) => {
  const app = express()

  // Shows request log on terminal
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

  // Routes every path
  app.use('/api', createRouter(db))

  return app
}
