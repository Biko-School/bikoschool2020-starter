import express, { Request, Response } from 'express'

export const createRouter = (db) => {
  const router = express.Router()

  router.get('/memes', (req, res) => {
    const memes = db.get('memes').take(50).value()
    res.status(200).json(memes)
  })
  return router
}
