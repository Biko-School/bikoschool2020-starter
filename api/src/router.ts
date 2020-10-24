import express, { Request, Response } from 'express'
import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema } from './DatabaseSchema'
import { Meme } from './Meme'

export const createRouter = (db: Lowdb.LowdbSync<DatabaseSchema>) => {
  const router = express.Router()

  function getMemes(): Meme[] {
    const memes = db.get('memes').take(50).value()
    const memesOrdered = memes.sort((a, b) => {
      return (
        new Date(b.import_datetime).getTime() -
        new Date(a.import_datetime).getTime()
      )
    })
    return memesOrdered.map((meme) => ({
      id: meme.id,
      title: meme.title,
      url: meme.images.small.url,
      creationDate: meme.import_datetime,
    }))
  }
  router.get('/memes', (req, res) => {
    const memes = getMemes()
    res.status(200).json({ memes })
  })
  return router
}
