import express from 'express'
import Lowdb from 'lowdb'
import { Meme } from 'Meme'
import { DatabaseSchema, MemeDB } from './DatabaseSchema'

export function createRoutes(db: Lowdb.LowdbSync<DatabaseSchema>) {
  const router = express.Router()

  router.get('/memes', (req, res) => {
    const memes = db
      .get('memes')
      .sortBy('import_datetime')
      .reverse()
      .take(50)
      .value()
    let mappedMemes = []
    for (let meme of memes) {
      mappedMemes.push(map(meme))
    }
    res.status(200).json(mappedMemes)
  })
  return router
}

function map(entity: MemeDB): Meme {
  return {
    id: entity.id,
    title: entity.title,
    image: {
      width: entity.images.small.width,
      height: entity.images.small.height,
      url: entity.images.small.url,
    },
    date: entity.import_datetime,
  }
}
