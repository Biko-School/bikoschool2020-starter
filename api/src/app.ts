import express, { Request, Response } from 'express'
import logger from 'morgan'
import { createRouter } from './router'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema } from './DatabaseSchema'
import Lowdb from 'lowdb'
import cors from 'cors'

export interface AppConfig {
  numRecentMemes?: number
}

export const createApp = (
  db: Lowdb.LowdbSync<DatabaseSchema>,
  appConfig?: AppConfig,
) => {
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
  app.use(
    '/api',
    cors({ origin: 'http://localhost:3000' }),
    createRouter(db, appConfig),
  )

  return app
}
