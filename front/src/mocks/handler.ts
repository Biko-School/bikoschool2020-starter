import { rest } from 'msw'
import db from '../db.json'

export const handlers = [
    rest.get('http://localhost:3000/memes', (req, res, ctx) => {
        debugger
      return res(
        ctx.status(200),
        ctx.json(db.memes.splice(0, 2))
      )
    }),
  ]