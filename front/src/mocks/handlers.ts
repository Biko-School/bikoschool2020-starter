import { rest } from 'msw'
import memes from './../fixtures/memes.json'
import aSingleMeme from './../fixtures/aSingleMeme.json'

export const handlers = [
  rest.get('http://localhost:3001/api/memes', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(memes)),
  ),
  rest.get('http://localhost:3001/api/memes/:tags', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(aSingleMeme)),
  ),
]
