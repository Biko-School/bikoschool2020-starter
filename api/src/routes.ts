import express from 'express'
import Lowdb from 'lowdb'
import { DatabaseSchema } from './DatabaseSchema'

export function createRoutes(db: Lowdb.LowdbSync<DatabaseSchema>) {
  const router = express.Router()

  router.get('/memes', (req, res) => {
    const memes = db.get('memes').sortBy('date').reverse().take(50).value()
    res.status(200).json(memes)
  })
  return router
}
