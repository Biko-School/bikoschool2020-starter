import { rest } from 'msw'
import memes from './../fixtures/memes.json'

export const handlers = [
  rest.get('http://localhost:3001/api/memes', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(memes))
  }),
  rest.get('http://localhost:3001/api/memes/:tag', (req, res, ctx) => {
    const { tag } = req.params
    return res(ctx.status(200), ctx.json([memes[0]]))
  }),
]
