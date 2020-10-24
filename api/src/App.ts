import express, { Request, Response } from 'express'
import Lowdb from 'lowdb'
import logger from 'morgan'
import { createRouter } from './routes'
import { DatabaseSchema } from './schemas/DatabaseSchema'
import cors from 'cors'

export const createApp = (db: Lowdb.LowdbSync<DatabaseSchema>) => {
  const App = express()

  // Shows request log on terminal
  // https://github.com/expressjs/morgan
  if (App.get('env') !== 'test') App.use(logger('combined'))

  // Parses incoming requests with JSON payloads
  // http://expressjs.com/es/api.html#express.json
  App.use(express.json())

  // Parses incoming requests with urlencoded payloads
  // http://expressjs.com/es/api.html#express.urlencoded
  App.use(express.urlencoded({ extended: false }))

  App.use(cors())

  App.use('/api', createRouter(db))

  return App
}
