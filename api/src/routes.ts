import express from 'express'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema } from './DatabaseSchema'

export const router = express.Router()

router.get('/memes', (req, res) => {
  const adapter = new FileSync<DatabaseSchema>('./db/db.json')
  const db = low(adapter)

  const memes = db.get('memes').take(50).value()
  res.status(200).json(memes)
})
