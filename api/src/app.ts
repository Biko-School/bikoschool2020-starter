import express, { Request, Response } from 'express'
import logger from 'morgan'
import { router } from './router'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema } from './DatabaseSchema'
import Lowdb from 'lowdb'
import cors from 'cors'

export interface AppConfig {
  numRecentMemes: number
}
const defaultConfig: AppConfig = {
  numRecentMemes: 50,
}
export const createApp = (
  db: Lowdb.LowdbSync<DatabaseSchema>,
  appConfig?: Partial<AppConfig>,
) => {
  const app = express()
  const config = Object.assign(defaultConfig, appConfig)

  // Shows request log on terminal
  // https://github.com/expressjs/morgan
  if (process.env.NODE_ENV !== 'test') {
    app.use(logger('combined'))
  }

  // Create app context
  app.use((req, _res, next) => {
    req.context = { db, config }
    next()
  })

  // Parses incoming requests with JSON payloads
  // http://expressjs.com/es/api.html#express.json
  app.use(express.json())

  // Parses incoming requests with urlencoded payloads
  // http://expressjs.com/es/api.html#express.urlencoded
  app.use(express.urlencoded({ extended: false }))

  // Routes every path
  app.use('/api', cors({ origin: 'http://localhost:3000' }), router)

  return app
}
