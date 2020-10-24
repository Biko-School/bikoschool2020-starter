import express, { Request, Response } from 'express'
import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema, MemeDatabase } from './DatabaseSchema'
import { Meme } from './Meme'

export const createRouter = (db: Lowdb.LowdbSync<DatabaseSchema>) => {
  const router = express.Router()

  router.get('/memes', (req, res) => {
    let databaseMemes: MemeDatabase[]
    if (req.query.search) {
      databaseMemes = getMemes(db)
        .filter({ tags: [req.query.search] })
        .value()
    } else {
      databaseMemes = getMemes(db).take(50).value()
    }

    const memes: Meme[] = mapMemesDatabaseToMemes(databaseMemes)
    res.status(200).json({ memes })
  })
  return router
}

function getMemes(db: Lowdb.LowdbSync<DatabaseSchema>) {
  return db.get('memes').sortBy('import_datetime').reverse()
}

function mapMemesDatabaseToMemes(memesDatabase: MemeDatabase[]): Meme[] {
  return memesDatabase.map((meme) => ({
    id: meme.id,
    title: meme.title,
    url: meme.images.small.url,
    creationDate: meme.import_datetime,
  }))
}
