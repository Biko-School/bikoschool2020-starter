import { Router, Response } from 'express'
import Lowdb from 'lowdb'
import { MemeDb } from './core/infrastructure/model/MemeDb'
import { MemeResponse } from './core/domain/MemeResponse'
import { DatabaseSchema } from './core/infrastructure/model/DatabaseSchema'
import { AppConfig } from './App'
import { getRecentMemes } from './core/services/getRecentMemesService'
import { MemeLowDbRepository } from './core/infrastructure/MemeLowDbRepository'

export const createRouter = (
  db: Lowdb.LowdbSync<DatabaseSchema>,
  appConfig: AppConfig,
): Router => {
  const routes = Router()

  // will handle any request that ends in /memes
  // depends on where the router is "use()'d"
  routes.get('/memes', function (req, res: Response<Array<MemeResponse>>) {
    let memesDb = db.get('memes')

    if (req.query.hasOwnProperty('search')) {
      const searchQuery = normalizeSearchQuery(req.query.search.toString())
      if (searchQuery.length < 3) {
        res.status(HttpStatus.BAD_REQUEST).send()
        return
      }
      memesDb = memesDb.filter(filterByTags(searchQuery))

      const memes: MemeDb[] = memesDb
        .sortBy('import_datetime')
        .reverse()
        .take(appConfig.numRecentMemes)
        .value()

      res.status(HttpStatus.OK).json(
        memes.map(
          (item: MemeDb): MemeResponse => ({
            url: item.images.small.url,
            title: item.title,
            id: item.id,
            date: item.import_datetime,
            tags: item.tags,
            width: item.images.small.width,
            height: item.images.small.height,
          }),
        ),
      )
    }

    const memes: MemeResponse[] = getRecentMemes(
      MemeLowDbRepository,
      appConfig.numRecentMemes,
    )

    res.status(HttpStatus.OK).json(memes)
  })
  return routes
}

const normalizeSearchQuery = (search: string) =>
  search
    .toLowerCase()
    .trim() //quita espacios antes y después
    .replace(/\s+/g, ' ') //si hay más de 1 espacio entre palabras, deja 1

const filterByTags = (searchQuery: string) =>
  function (meme: MemeDb) {
    const tagsIncludingSearchQuery = meme.tags.filter((tag) =>
      tag.toLowerCase().includes(searchQuery),
    )
    return tagsIncludingSearchQuery.length > 0
  }

export const HttpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
}
