import express from 'express'
import Lowdb from 'lowdb'
import { Meme } from 'Meme'
import { DatabaseSchema, MemeDB } from './DatabaseSchema'

export function createRoutes(db: Lowdb.LowdbSync<DatabaseSchema>) {
  const router = express.Router()
  
  router.get('/memes', (req, res) => {
    const mostRecentMemes = db
      .get('memes')
      .sortBy('import_datetime')
      .reverse()
      .take(50)
      .value()

    res.status(200).json(mostRecentMemes.map(meme => map(meme)))
  })

  router.get('/memes/search', (req, res) => {
    // estructura de la busqueda /memes/search?filter=
    const filter = req.query.filter as string

    if (filter.length < 3) {
      res
        .status(403)
        .json('La longitud mínima de búsqueda debe de ser 3 carácteres')
    }

    const filteredMemes = db
    .get('memes')
    .filter(meme => meme.tags.includes(filter))
    .value()
  
    res.status(200).json(filteredMemes.map(filteredMeme => map(filteredMeme)))
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
    tags: [...entity.tags]
  }
}
