import express, { Request, Response } from 'express'
import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema, MemeDatabase } from './DatabaseSchema'
import { Meme } from './Meme'

interface MemeResponse {
  memes: Meme[]
}

export const router = express.Router()

router.get('/memes', (req, res: Response<MemeResponse>) => {
  const databaseMemes: MemeDatabase[] = req.context.db
    .get('memes')
    .sortBy('import_datetime')
    .reverse()
    .take(req.context.config.numRecentMemes)
    .value()

  const memes: Meme[] = mapMemesDatabaseToMemes(databaseMemes)
  res.status(200).json({ memes })
})

router.get('/memes/search', (req, res: Response<MemeResponse>) => {
  const query = (req.query.q as string).toLocaleLowerCase()

  const databaseMemes: MemeDatabase[] = req.context.db
    .get('memes')
    .filter((meme) => {
      return meme.tags.some((tag) => tag.includes(query))
    })
    .sortBy('import_datetime')
    .reverse()
    .value()

  const memes: Meme[] = mapMemesDatabaseToMemes(databaseMemes)
  res.status(200).json({ memes })
})

function mapMemesDatabaseToMemes(memesDatabase: MemeDatabase[]): Meme[] {
  return memesDatabase.map((meme) => ({
    id: meme.id,
    title: meme.title,
    url: meme.images.small.url,
    creationDate: meme.import_datetime,
  }))
}
