import express, { Request, Response } from 'express'
import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema, MemeDatabase } from './DatabaseSchema'
import { Meme } from './Meme'

export interface RouterConfig {
  numRecentMemes?: number
}

const defaultConfig: RouterConfig = {
  numRecentMemes: 50,
}
export const createRouter = (
  db: Lowdb.LowdbSync<DatabaseSchema>,
  routerConfig?: RouterConfig,
) => {
  const router = express.Router()
  const config: RouterConfig = Object.assign(defaultConfig, routerConfig)

  router.get('/memes/search', (req, res) => {
    const databaseMemes: MemeDatabase[] = db
      .get('memes')
      .filter({ tags: [req.query.q] })
      .value()

    const memes: Meme[] = mapMemesDatabaseToMemes(databaseMemes)
    res.status(200).json({ memes })
  })

  router.get('/memes', (_, res) => {
    const databaseMemes: MemeDatabase[] = db
      .get('memes')
      .sortBy('import_datetime')
      .reverse()
      .take(config.numRecentMemes)
      .value()

    const memes: Meme[] = mapMemesDatabaseToMemes(databaseMemes)
    res.status(200).json({ memes })
  })
  return router
}

function mapMemesDatabaseToMemes(memesDatabase: MemeDatabase[]): Meme[] {
  return memesDatabase.map((meme) => ({
    id: meme.id,
    title: meme.title,
    url: meme.images.small.url,
    creationDate: meme.import_datetime,
  }))
}
