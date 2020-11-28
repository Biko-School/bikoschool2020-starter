import express from 'express'
import Lowdb from 'lowdb'
import { Meme } from 'core/domain/meme/Meme'
import { DatabaseSchema, MemeDB } from './DatabaseSchema'
import { getMemesService } from './core/services/meme/getMemesService'

export function createRoutes(db: Lowdb.LowdbSync<DatabaseSchema>) {
  const router = express.Router()
  const _getMemesService = new getMemesService(db)
  router.get('/memes', async (req, res) => {
    try {
      const mappedMemes: Meme[] = await _getMemesService.getAllMemes()
      res.status(200).json(mappedMemes)
    } catch (e) {
      const errorObject = {
        message: 'Se ha producido un error',
      }
      res.status(500).json(errorObject)
    }
  })
  const errorObject = {
    message: 'La longitud mínima de búsqueda debe de ser 3 carácteres',
  }
  router.get('/memes/:tag', async (req, res) => {
    if (req.params.tag.length < 3) {
      res.status(403).json(errorObject)
    }
    const query = req.params.tag
    try {
      const mappedMemes: Meme[] = await _getMemesService.getAllMemesByTag(query)
      res.status(200).json(mappedMemes)
    } catch (e) {
      const errorObject = {
        message: 'Se ha producido un error',
      }
      res.status(500).json(errorObject)
    }
  })

  return router
}
