import { Router, Response } from 'express'
import { MemeResponse } from './core/domain/MemeResponse'
import { AppConfig } from './App'
import { getRecentMemes } from './core/services/getRecentMemesService'
import { MemeLowDbRepository } from './core/infrastructure/MemeLowDbRepository'
import { findRecentMemes } from './core/services/findMemesByTagService'

export const createRouter = (appConfig: AppConfig): Router => {
  const routes = Router()

  // will handle any request that ends in /memes
  // depends on where the router is "use()'d"
  routes.get('/memes', function (req, res: Response<Array<MemeResponse>>) {
    if (req.query.hasOwnProperty('search')) {
      const searchQuery = req.query.search.toString()
      try {
        const memes: MemeResponse[] = findRecentMemes(
          MemeLowDbRepository,
          searchQuery,
          appConfig.numRecentMemes,
        )
        res.status(HttpStatus.OK).json(memes)
      } catch {
        res.status(HttpStatus.BAD_REQUEST).send()
      }
    }
    const memes: MemeResponse[] = getRecentMemes(
      MemeLowDbRepository,
      appConfig.numRecentMemes,
    )

    res.status(HttpStatus.OK).json(memes)
  })
  return routes
}

export const HttpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
}
