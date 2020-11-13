import { Router, Response } from 'express'
import Lowdb from 'lowdb'
import { MemeDb } from 'schemas/MemeDb'
import { MemeResponse } from 'schemas/MemeResponse'
import { DatabaseSchema } from './schemas/DatabaseSchema'
import { AppConfig } from './App'

export const createRouter = (
  db: Lowdb.LowdbSync<DatabaseSchema>,
  appConfig: AppConfig,
): Router => {
  const routes = Router()

  // will handle any request that ends in /events
  // depends on where the router is "use()'d"
  routes.get('/memes', function (
    req,
    res: Response<Array<MemeResponse>>,
    next,
  ) {
    let memesDb = db.get('memes')

    if (req.query.hasOwnProperty('search')) {
      memesDb = memesDb.filter((meme) =>
        meme.tags.includes(req.query.search.toString(), 0),
      )
    }

    const memes: Array<MemeDb> = memesDb
      .sortBy('import_datetime')
      .reverse()
      .take(appConfig.numRecentMemes)
      .value()

    res.status(200).json(
      memes.map(
        (item: MemeDb): MemeResponse => ({
          url: item.images.original.url,
          title: item.title,
          id: item.id,
          date: item.import_datetime,
        }),
      ),
    )
  })
  return routes
}
