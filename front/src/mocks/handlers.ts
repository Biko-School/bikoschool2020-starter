import { rest } from 'msw'
import memes from './../fixtures/memes.json'
import aSingleMeme from './../fixtures/aSingleMeme.json'
import aDetailMeme from './../fixtures/aDetailMeme.json'

export const handlers = [
  rest.get('http://localhost:3001/api/memes', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(memes)),
  ),
  rest.get('http://localhost:3001/api/meme/:id', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(aDetailMeme)),
  ),
  rest.get('http://localhost:3001/api/memes/:tags', (req, res, ctx) => {
    let tags = req.url.searchParams.get('tags')
    if (tags === null) tags = ''
    if (tags.length < 3)
      res(
        ctx.status(401),
        ctx.json('La longitud mínima de búsqueda debe de ser 3 carácteres'),
      )
    res(ctx.status(200), ctx.json(aSingleMeme))
  }),
]
