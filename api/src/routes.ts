import { Router } from 'express'
import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { DatabaseSchema } from './DatabaseSchema'

export const routes = Router()

const adapter = new FileSync<DatabaseSchema>('./db/db.json')
const db = Lowdb(adapter)

routes.get('/memes', (req, res) => {
  const memes = db.get('memes').take(50).value()

  res.status(200).json(memes)
})
