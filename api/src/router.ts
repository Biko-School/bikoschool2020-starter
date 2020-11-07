import express, { Request, Response } from 'express'
import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema, MemeDatabase } from './DatabaseSchema'
import { Meme } from './Meme'

interface MemeResponse {
  memes: Meme[]
}
interface ErrorResponse {
  status: number,
  message: string
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

router.get('/memes/search', (req, res: Response<MemeResponse | ErrorResponse>) => {
  const query = (req.query.q as string).toLocaleLowerCase()

  if (query.length < 3) res.status(400).send({
    status: 400,
    message: "The search term should 3 or more characters"
  });

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
