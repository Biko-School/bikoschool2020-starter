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

  // will handle any request that ends in /memes
  // depends on where the router is "use()'d"
  routes.get('/memes', function (
    req,
    res: Response<Array<MemeResponse>>
  ) {
    let memesDb = db.get('memes')

    if (req.query.hasOwnProperty('search')) {
      const searchQuery = normalizeSearchQuery( req.query.search.toString() )
      memesDb = memesDb.filter(filterByTags(searchQuery))
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
          tags: item.tags
        }),
      ),
    )
  })
  return routes
}

const normalizeSearchQuery = (search:string)=> search
  .toLowerCase()
  .trim() //quita espacios antes y después
  .replace(/\s+/g, " ") //si hay más de 1 espacio entre palabras, deja 1

const filterByTags = (searchQuery:string)=> (function(meme:MemeDb){
  const tagsIncludingSearchQuery = meme.tags.filter(tag=>tag.toLowerCase().includes(searchQuery))
  return tagsIncludingSearchQuery.length>0
})