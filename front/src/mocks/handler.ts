import { rest } from 'msw'
import db from '../db.json'

export const handlers = [
    rest.get('http://localhost:3333/api/memes', (req, res, ctx) => {

      return res(
        ctx.status(200),
        ctx.json(db.memes.splice(0, 10))
      )
    }),
  ]