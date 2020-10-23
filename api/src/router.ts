import express, { Request, Response } from 'express'
import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema } from './DatabaseSchema'

export const createRouter = (db: Lowdb.LowdbSync<DatabaseSchema>) => {
  const router = express.Router()

  router.get('/memes', (req, res) => {
    const memes = db.get('memes').take(50).value()
    const memesOrdered = memes.sort((a, b) => {
      return (
        new Date(b.import_datetime).getTime() -
        new Date(a.import_datetime).getTime()
      )
    })
    res.status(200).json(memesOrdered)
  })
  return router
}
