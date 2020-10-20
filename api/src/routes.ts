import Router from 'express'
import lowDb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema } from './DatabaseSchema'

export const routes = Router()

const adapter = new FileSync<DatabaseSchema>('./db/db.json')
const db = lowDb(adapter)

// will handle any request that ends in /events
// depends on where the router is "use()'d"
routes.get('/memes', function (req, res, next) {
  const memes = db.get('memes').take(50).value()
  res.status(200).json(memes)
})
