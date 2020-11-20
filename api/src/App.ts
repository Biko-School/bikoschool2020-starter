import express, { Express, Request, Response } from 'express'
import logger from 'morgan'
import { createRouter } from './routes'
import cors from 'cors'
import { MemeRepository } from 'core/domain/MemeRepository'

export interface AppConfig {
  numRecentMemes: number
}

let defaultAppConfig: AppConfig = {
  numRecentMemes: 50,
}

export const createApp = (
  memeRepository: MemeRepository,
  appConfig: Partial<AppConfig> = defaultAppConfig,
): Express => {
  const appConfigFull: AppConfig = { ...defaultAppConfig, ...appConfig }
  const App = express()

  // Shows request log on terminal
  // https://github.com/expressjs/morgan
  if (App.get('env') !== 'test') {
    App.use(logger('combined'))
  }

  // Parses incoming requests with JSON payloads
  // http://expressjs.com/es/api.html#express.json
  App.use(express.json())

  // Parses incoming requests with urlencoded payloads
  // http://expressjs.com/es/api.html#express.urlencoded
  App.use(express.urlencoded({ extended: false }))

  App.use(cors())

  App.use('/api', createRouter(appConfigFull))

  return App
}
