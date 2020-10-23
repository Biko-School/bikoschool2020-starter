import express, { Request, Response } from 'express'
export const router = express.Router()
import { db } from './db'

router.get('/memes', (req, res) => {
  const memes = db.get('memes').take(50).value()
  res.status(200).json(memes)
})
