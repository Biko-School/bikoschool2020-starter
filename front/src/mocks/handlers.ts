import { rest } from 'msw'
import memes from './../fixtures/memes.json'

export const handlers = [
  rest.get('http://localhost:3001/api/memes', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(memes)),
  ),
]
