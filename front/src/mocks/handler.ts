import { rest } from 'msw'
import db from '../db.json'

export const handlers = [
    rest.get('http://127.0.0.1/memes', (req, res, ctx) => {
        debugger
      return res(
        ctx.status(200),
        ctx.json(db.memes.splice(0, 20))
      )
    }),
  ]