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

    res.status(200).json(memes.map(meme => map(meme)))
  })

  router.get('/memes/search', (req, res) => {
    // estructura de la busqueda /memes/search?filter=

    if (req.query.filter.length < 3) {
      res
        .status(403)
        .json('La longitud mínima de búsqueda debe de ser 3 carácteres')
    }

    const memes = db
    .get('memes')
    .filter((meme) => (meme.tags.filter(tag => tag === req.query.filter).length > 0))
    .value()
  
  res.status(200).json(memes.map(meme => map(meme)))
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
