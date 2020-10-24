import express, { Request, Response } from 'express'
import logger from 'morgan'
import { createRoutes } from './routes'
import Lowdb from 'lowdb'
import { DatabaseSchema } from './DatabaseSchema'
import cors from 'cors'

export function createApp(db: Lowdb.LowdbSync<DatabaseSchema>) {
  const app = express()

  // Shows request log on terminal
  // https://github.com/expressjs/morgan
  if (app.get('env') !== 'test') app.use(logger('combined'))

  // Parses incoming requests with JSON payloads
  // http://expressjs.com/es/api.html#express.json
  app.use(express.json())

  // Parses incoming requests with urlencoded payloads
  // http://expressjs.com/es/api.html#express.urlencoded
  app.use(express.urlencoded({ extended: false }))

  app.use(cors())
  //Router
  app.use('/api', createRoutes(db))

  return app
}
