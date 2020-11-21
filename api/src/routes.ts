import express from 'express'
import Lowdb from 'lowdb'
import { Meme } from 'Meme'
import { DatabaseSchema, MemeDB } from './DatabaseSchema'

export function createRoutes(db: Lowdb.LowdbSync<DatabaseSchema>) {
  const router = express.Router()

  router.get('/memes', (req, res) => {
    try {
      const memes = db
        .get('memes')
        .sortBy('import_datetime')
        .reverse()
        .take(50)
        .value()
      let mappedMemes: Array<Meme> = []
      for (let meme of memes) {
        mappedMemes.push(map(meme))
      }
      res.status(200).json(mappedMemes)
    } catch (e) {
      const errorObject = {
        message: 'Se ha producido un error',
      }
      console.log(errorObject)
      res.status(500).json(errorObject)
    }
  })
  const errorObject = {
    message: 'La longitud mínima de búsqueda debe de ser 3 carácteres',
  }
  router.get('/memes/:tag', (req, res) => {
    if (req.params.tag.length < 3) {
      res.status(403).json(errorObject)
    }
    const tag = req.params.tag
    const memes = db
      .get('memes')
      .sortBy('import_datetime')
      .find({ tags: [tag] })
      .reverse()
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
    tags: entity.tags,
    user: entity.user,
  }
}
