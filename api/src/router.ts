import express, { Request, Response } from 'express'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema } from './DatabaseSchema'

export const createRouter = (db: FileSync<DatabaseSchema>) => {
  const router = express.Router()

  router.get('/memes', (req, res) => {
    const memes = db.get('memes').take(50).value()
    res.status(200).json(memes)
  })
  return router
}
