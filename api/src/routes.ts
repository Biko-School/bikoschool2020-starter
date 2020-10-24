import { Router } from 'express'
import Lowdb from 'lowdb'
import { DatabaseSchema } from './schemas/DatabaseSchema'

export function createRouter(db: Lowdb.LowdbSync<DatabaseSchema>) {
  const routes = Router()

  // will handle any request that ends in /events
  // depends on where the router is "use()'d"
  routes.get('/memes', function (req, res, next) {
    const memes = db.get('memes').sortBy('import_datetime').take(50).value()
    res.status(200).json(
      memes.map((item) => ({
        url: item.images.original.url,
        title: item.title,
        id: item.id,
        date: item.import_datetime,
      })),
    )
  })
  return routes
}
